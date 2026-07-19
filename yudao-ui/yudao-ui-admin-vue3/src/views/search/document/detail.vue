<template>
  <ContentWrap :title="'情报详情'" v-loading="loading">
    <template #header>
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <el-button @click="handleBack" icon="el-icon-back">返回列表</el-button>
        </div>
        <div class="flex gap-2">
          <el-button 
            :type="isFollowed ? 'success' : 'primary'" 
            @click="toggleFollow"
            :icon="isFollowed ? 'ep:circle-check' : 'ep:star'"
          >
            {{ isFollowed ? '已加入关注' : '加入关注' }}
          </el-button>
        </div>
      </div>
    </template>

    <el-row :gutter="20" class="mt-4">
      <!-- 左侧主要内容区 -->
      <el-col :span="16">
        <el-card shadow="never" class="mb-4">
          <div class="flex items-center gap-3 mb-4">
            <el-tag effect="dark" type="danger" size="large">情报</el-tag>
            <span class="text-gray-500 text-sm">更新时间：{{ dateFormatter(detailData.createTime) }}</span>
          </div>

          <h2 class="text-2xl font-bold mb-6 text-gray-800" v-html="highlightText(detailData.title, searchKey) || detailData.title"></h2>

          <!-- 摘要区块 -->
          <div class="bg-blue-50/50 border-l-4 border-blue-500 p-4 rounded-r-md mb-6">
            <h3 class="text-blue-900 font-bold mb-2 flex items-center gap-2">
              <Icon icon="ep:reading-lamp" /> 研判摘要
            </h3>
            <p class="text-blue-950 text-sm leading-relaxed">
              根据系统智能摘要分析，该情报描述了：
              <span class="font-medium" v-html="highlightText(getSnippet(detailData.content), searchKey)"></span>
            </p>
          </div>

          <!-- 正文区块 -->
          <div class="prose max-w-none mb-6">
            <h3 class="text-lg font-bold mb-3 border-b pb-2 flex items-center gap-2 text-gray-800">
              <Icon icon="ep:document-copy" /> 正文内容
            </h3>
            <div 
              class="text-gray-700 leading-8 text-justify whitespace-pre-line text-[15px]"
              v-html="highlightText(detailData.content, searchKey) || detailData.content"
            ></div>
          </div>

          <!-- 研判提示 -->
          <div class="bg-amber-50/60 border-l-4 border-amber-500 p-4 rounded-r-md">
            <h3 class="text-amber-900 font-bold mb-2 flex items-center gap-2">
              <Icon icon="ep:warning" /> 研判复核提示
            </h3>
            <p class="text-amber-950 text-sm leading-relaxed">
              该情报与已关注的专题高度相关。建议纳入地区安全态势持续跟踪，并与航运风险、能源市场波动等外围指标联动观察。
            </p>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧属性与多语言处理区 -->
      <el-col :span="8">
        <!-- 情报属性卡片 -->
        <el-card shadow="never" class="mb-4">
          <template #header>
            <div class="font-bold flex items-center gap-2 text-gray-800">
              <Icon icon="ep:info-filled" /> 情报属性
            </div>
          </template>
          
          <div class="flex flex-col gap-4 text-sm">
            <div class="flex justify-between items-center border-b pb-2">
              <span class="text-gray-500">情报编号</span>
              <strong class="text-gray-800">OSINT-{{ (detailData.id || '').substring(0, 8).toUpperCase() }}</strong>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <span class="text-gray-500">采集源头</span>
              <strong class="text-gray-800">{{ detailData.extra?.source || '开源媒体监测' }}</strong>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <span class="text-gray-500">倾向倾向性</span>
              <el-tag size="small" type="warning">中性</el-tag>
            </div>
            <div class="flex justify-between items-center border-b pb-2">
              <span class="text-gray-500">处理状态</span>
              <el-tag size="small" type="info">待研判复核</el-tag>
            </div>
            <div>
              <span class="text-gray-500 block mb-2">匹配关键词</span>
              <div class="flex flex-wrap gap-1">
                <el-tag 
                  v-for="tag in detailData.keywords" 
                  :key="tag" 
                  size="small" 
                  type="success"
                  v-html="highlightText(tag, searchKey)"
                ></el-tag>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 多语言处理卡片 -->
        <el-card shadow="never">
          <template #header>
            <div class="font-bold flex items-center gap-2 text-gray-800">
              <Icon icon="ep:memo" /> 多语言智能翻译
            </div>
          </template>

          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <el-select v-model="sourceLang" placeholder="源语言" class="w-full">
                <el-option label="英文" value="en" />
                <el-option label="中文" value="zh" />
                <el-option label="朝鲜语/韩语" value="ko" />
                <el-option label="俄语" value="ru" />
              </el-select>
              <span class="text-gray-400">→</span>
              <el-select v-model="targetLang" placeholder="目标语言" class="w-full">
                <el-option label="中文" value="zh" />
                <el-option label="英文" value="en" />
                <el-option label="朝鲜语/韩语" value="ko" />
                <el-option label="俄语" value="ru" />
              </el-select>
            </div>

            <el-input
              v-model="translationInput"
              type="textarea"
              :rows="5"
              placeholder="请输入或由左侧复制待翻译正文"
            />

            <div class="flex justify-end">
              <el-button 
                type="primary" 
                :loading="translating" 
                @click="handleTranslate"
                icon="ep:refresh"
              >
                开始翻译
              </el-button>
            </div>

            <div v-if="translationOutput || translating" class="border-t pt-4">
              <span class="text-gray-500 text-xs block mb-2">翻译处理结果：</span>
              <el-skeleton :rows="3" animated :loading="translating">
                <div class="bg-gray-50 p-3 rounded border text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {{ translationOutput }}
                </div>
              </el-skeleton>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { dateFormatter } from '@/utils/formatTime'
import * as SearchDocumentApi from '@/api/search/document'

defineOptions({ name: 'SearchDocumentDetail' })

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const detailData = ref<any>({
  id: undefined,
  title: '',
  keywords: [],
  content: '',
  extra: {},
  createTime: undefined
})

const id = route.query.id as string
const searchKey = ref((route.query.searchKey as string) || '')
const isFollowed = ref(false)

// 翻译相关变量
const sourceLang = ref('en')
const targetLang = ref('zh')
const translationInput = ref('')
const translationOutput = ref('')
const translating = ref(false)

/** 获取详情 */
const getDetail = async () => {
  if (!id) {
    ElMessage.error('缺少文档ID参数')
    loading.value = false
    return
  }
  loading.value = true
  try {
    const data = await SearchDocumentApi.getSearchDocument(id)
    detailData.value = data
    // 默认将详情正文填入待翻译输入框
    translationInput.value = data.content || ''
  } catch (error) {
    console.error(error)
    ElMessage.error('拉取情报详情失败')
  } finally {
    loading.value = false
  }
}

/** 真实翻译实现 */
const handleTranslate = async () => {
  if (!translationInput.value.trim()) {
    ElMessage.warning('请输入待翻译的文本内容')
    return
  }
  if (sourceLang.value === targetLang.value) {
    ElMessage.warning('源语言和目标语言不能相同')
    return
  }
  translating.value = true
  translationOutput.value = ''
  try {
    const data = await SearchDocumentApi.translateText({
      text: translationInput.value,
      sourceLang: sourceLang.value,
      targetLang: targetLang.value
    })
    translationOutput.value = data
    ElMessage.success('翻译处理完成')
  } catch (error) {
    console.error(error)
    ElMessage.error('离线翻译请求失败')
  } finally {
    translating.value = false
  }
}

/** 文本高亮方法 */
const highlightText = (text: string, key: string) => {
  if (!text || !key) return text
  const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  const regex = new RegExp(`(${escapedKey})`, 'gi')
  return text.replace(
    regex,
    '<mark style="background-color: #ffeb3b; color: #000000; padding: 2px 4px; border-radius: 2px; font-weight: bold;">$1</mark>'
  )
}

/** 获取内容片段摘要 */
const getSnippet = (text: string) => {
  if (!text) return ''
  return text.length > 150 ? text.substring(0, 150) + '...' : text
}

const toggleFollow = () => {
  isFollowed.value = !isFollowed.value
  ElMessage.success(isFollowed.value ? '已成功将该情报加入重点关注' : '已取消关注')
}

const handleBack = () => {
  router.push({
    path: '/search/document',
    query: {
      searchKey: searchKey.value
    }
  })
}

onMounted(() => {
  getDetail()
})
</script>

<style scoped>
.prose {
  color: #374151;
}
.prose h3 {
  color: #1f2937;
}
</style>
