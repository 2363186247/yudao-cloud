<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="检索类型" prop="searchType">
        <el-select v-model="queryParams.searchType" placeholder="请选择检索范围" style="width: 120px;">
          <el-option label="全文检索" value="all" />
          <el-option label="标题检索" value="title" />
          <el-option label="正文检索" value="content" />
        </el-select>
      </el-form-item>
      <el-form-item label="检索内容" prop="searchKey">
        <el-input
          v-model="queryParams.searchKey"
          placeholder="请输入检索关键词"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        
        <!-- 新增：去除手动表单，改为一键 JSON 文件批量导入 -->
        <el-upload
          action=""
          accept=".json"
          :before-upload="handleJsonBatchImport"
          :show-file-list="false"
          style="display: inline-block; margin-left: 12px;"
          v-hasPermi="['search:document:create']"
        >
          <el-button type="primary" plain>
            <Icon icon="ep:plus" class="mr-5px" /> 批量导入
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list">
      <el-table-column label="文档ID" align="center" prop="id" width="220" />
      <el-table-column label="文档标题" align="center" :show-overflow-tooltip="true">
        <template #default="scope">
          <!-- 检索命中标题高亮 -->
          <span v-html="scope.row.titleHighlight || scope.row.title"></span>
        </template>
      </el-table-column>
      <el-table-column label="关键字" align="center" prop="keywords">
        <template #default="scope">
          <el-tag
            v-for="tag in scope.row.keywords"
            :key="tag"
            class="mr-5px"
            size="small"
          >
            <!-- 检索命中关键字高亮 -->
            <span v-html="highlightText(tag, highlightSearchKey)"></span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
        :formatter="dateFormatter"
      />
      <el-table-column label="操作" align="center" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openReader(scope.row.id)"
          >
            详情
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['search:document:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { dateFormatter } from '@/utils/formatTime'
import * as SearchDocumentApi from '@/api/search/document'

defineOptions({ name: 'SearchDocument' })

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const total = ref(0)
const list = ref([])
const queryFormRef = ref()

// 检索参数 (左侧选择检索范围，默认全文检索 all)
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  searchType: 'all',
  searchKey: ''
})

// 专门用来存储高亮显示所使用的关键字（只在点击搜索或重置后更新，避免打字时即时高亮）
const highlightSearchKey = ref('')

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await SearchDocumentApi.getSearchDocumentPage(queryParams)
    list.value = data.list
    total.value = data.total
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  highlightSearchKey.value = queryParams.searchKey
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value?.resetFields()
  queryParams.searchType = 'all'
  queryParams.searchKey = ''
  highlightSearchKey.value = ''
  handleQuery()
}

/** 文本高亮辅助方法 (支持背景黄色填充，黑字高亮) */
const highlightText = (text: string, searchKey: string) => {
  if (!text || !searchKey) {
    return text
  }
  // 转义正则关键字以防崩溃
  const escapedKey = searchKey.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regex = new RegExp(`(${escapedKey})`, 'gi')
  return text.replace(
    regex,
    '<mark style="background-color: #ffeb3b; color: #000000; padding: 1px 3px; border-radius: 2px; font-weight: bold;">$1</mark>'
  )
}

/** 批量导入新闻 JSON 逻辑 */
const handleJsonBatchImport = (rawFile: any) => {
  const reader = new FileReader()
  reader.onload = async (e: any) => {
    try {
      const parsed = JSON.parse(e.target.result)
      const items = Array.isArray(parsed) ? parsed : [parsed]
      
      // 提取核心属性，并归纳动态扩展属性
      const importList = items.map((item: any) => {
        const { title, keywords, keyword, content, ...extra } = item
        // 兼容 keywords 和 keyword
        let kw = keywords || keyword || []
        if (typeof kw === 'string') {
          kw = kw.split(/[,，\s]+/).map((s: string) => s.trim()).filter(Boolean)
        } else if (Array.isArray(kw)) {
          kw = kw.map((s: any) => String(s).trim()).filter(Boolean)
        } else {
          kw = []
        }
        return {
          title: title || '无标题',
          keywords: kw,
          content: content || '无内容',
          extra: extra || {}
        }
      })

      loading.value = true
      await SearchDocumentApi.batchImportSearchDocuments(importList)
      ElMessage.success(`成功导入 ${importList.length} 条文档！`)
      queryParams.pageNo = 1
      getList()
    } catch (err) {
      console.error(err)
      ElMessage.error('JSON 文件读取解析或导入失败，请检查数据格式！')
    } finally {
      loading.value = false
    }
  }
  reader.readAsText(rawFile)
  return false // 阻止 Element Plus 默认上传事件
}


/** 打开详情页 */
const openReader = (id: string) => {
  router.push({
    path: '/search/document/detail',
    query: {
      id: id,
      searchKey: highlightSearchKey.value
    }
  })
}

/** 删除按钮操作 */
const handleDelete = async (id: string) => {
  try {
    await ElMessageBox.confirm('是否确认删除选中的数据？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await SearchDocumentApi.deleteSearchDocument(id)
    ElMessage.success('删除成功')
    getList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error(error)
    }
  }
}

onMounted(() => {
  if (route.query.searchKey) {
    queryParams.searchKey = route.query.searchKey as string
    highlightSearchKey.value = route.query.searchKey as string
  }
  getList()
})
</script>
