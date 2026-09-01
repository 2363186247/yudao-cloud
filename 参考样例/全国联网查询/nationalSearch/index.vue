<template>
  <!-- 查询条件 -->
  <SduContentWrap>
    <SduForm
      class="mt-md"
      ref="searchFormRef"
      :model="formData"
      :schema="nationalSearchSchema"
      :is-col="true"
    />
  </SduContentWrap>

  <SduHorizontalButtonGroup class="mt-lg">
    <template #right>
      <ElButton type="primary" @click="handleSearch"
        ><sdu-icon icon="ep:search" /> 搜索</ElButton
      >
      <ElButton @click="handleReset"><sdu-icon icon="ep:refresh" /> 重置</ElButton>
    </template>
  </SduHorizontalButtonGroup>

  <!-- 列表 -->
  <SduContentWrap class="mt-lg">
    <SduTable
      :columns="nationalColumns"
      :data="tableData"
      :reserve-index="true"
      :pageSize="pageSize"
      :currentPage="pageNo"
      :pagination="{ total: total }"
      @update:current-page="handlePageChange"
      @update:page-size="handleSizeChange"
    >
      <!-- 关联情报 -->
      <template #relatedInfo="{ row }">
        {{ row.relatedInfo ? `${row.relatedInfo} 条` : '-' }}
      </template>
      <!-- 状态 -->
      <template #status="{ row }">
        <ElTag :type="statusMap[row.status]?.type ?? 'info'" size="small">
          {{ statusMap[row.status]?.label ?? row.status }}
        </ElTag>
      </template>
      <template #dataSource="{ row }">
          {{ getDictLabel(DICT_TYPE.KYQB_QGLWCX_SJLY, row.dataSource) }}
          <!-- {{row.dataSource}} -->
      </template>
      <!-- 操作 -->
      <template #action="{ row }">
        <ElButton type="primary" link @click="handleDetail(row)">查看详情</ElButton>
      </template>
    </SduTable>
  </SduContentWrap>

  <Detail ref="detailRef" />
</template>

<script lang="ts" setup>
import { toRaw } from 'vue'
import Detail from './components/Detail.vue'
import { nationalSearchSchema, nationalColumns, statusMap } from './data/data'
import * as NationalSearchApi from '@/api/queryStat/nationalSearch'
import { DICT_TYPE, getDictOptions, getDictLabel } from '@/utils/dict'

const searchFormRef = ref()
const detailRef = ref()

const formData = reactive<any>({})

const tableData = ref<any[]>([])
const total = ref<number>(0)
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)

// onMounted(() => handleSearch())
// onActivated(() => handleSearch())

const handleSearch = async () => {
  searchFormRef.value
    ?.getElFormRef()
    .validate(async(valid: boolean) => {
    if (!valid) return

  const formModel = toRaw(searchFormRef.value?.formModel) ?? {}
  const param = { ...formModel, pageNo: pageNo.value, pageSize: pageSize.value }

  // 过滤空数据
  Object.keys(param).forEach((key) => {
    if ([null, undefined, ''].includes(param[key])) delete param[key]
    if (Array.isArray(param[key]) && param[key].length == 0) delete param[key]
  })

  try {
    const res = await NationalSearchApi.getNationalSearchPage(param)
    tableData.value = res?.list ?? []
    total.value = res?.total ?? 0
  } catch {
    tableData.value = []
    total.value = 0
  }

})
}

const handleReset = async () => {
  searchFormRef.value?.getElFormRef().resetFields()
  pageNo.value = 1
  tableData.value = []
  total.value = 0
  // handleSearch()
}

const handlePageChange = (val: number) => {
  pageNo.value = val
  handleSearch()
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  pageNo.value = 1
  handleSearch()
}

const handleDetail = (row: any) => {
  detailRef.value?.open(row)
}
</script>
