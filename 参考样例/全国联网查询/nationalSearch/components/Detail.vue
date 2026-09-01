<template>
  <SduDialog v-model="dialogVisible" title="联网查询详情" width="1100px">
    <div class="flex flex-col gap-md">
      <!-- 基础信息 -->
      <SduDescriptions
        v-bind="UN_BORDER_PROPS"
        title="基础信息"
        :schema="basicInfoSchema"
        :data="formData"
        :columns="2"
      >
        <template #birthDate="{row}">
          {{ formatTimestamp(row.birthDate) }}
        </template>
      </SduDescriptions>

      <!-- 联网信息 -->
      <SduDescriptions
        v-bind="UN_BORDER_PROPS"
        title="联网信息"
        :schema="networkInfoSchema"
        :data="formData"
        :columns="2"
      >
        <template #dataSource="{row}">
          {{ getDictLabel(DICT_TYPE.KYQB_QGLWCX_SJLY, row.dataSource) }}
        </template>
        <template #relatedInfo="{row}">
          {{ row.relatedInfo ? `${row.relatedInfo} 条` : '-' }}
        </template>
        <template #updateTime="{row}">
          {{ formatTimestamp(row.updateTime) }}
        </template>
        <template #status="{row}">
          <ElTag :type="statusMap[row.status]?.type ?? 'info'" size="small">
            {{ statusMap[row.status]?.label ?? row.status }}
          </ElTag>
        </template>
      </SduDescriptions>

      <!-- 动态列表 -->
      <SduContentWrap title="动态信息" v-bind="UN_BORDER_PROPS">
        <SduTable
          :columns="dynamicColumns"
          :data="dynamicList"
        />
      </SduContentWrap>
    </div>

    <template #footer>
      <ElButton @click="dialogVisible = false">关闭</ElButton>
      <!-- <ElButton type="primary" @click="handleExport">导出该条</ElButton> -->
    </template>
  </SduDialog>
</template>

<script setup lang="ts">
import { basicInfoSchema, networkInfoSchema, statusMap, formatTimestamp } from '../data/data'
import { DICT_TYPE, getDictLabel } from '@/utils/dict'
import * as NationalSearchApi from '@/api/queryStat/nationalSearch'

const message = useMessage()

const UN_BORDER_PROPS = { collapse: false, border: false, hoverType: 'primary' }

const dialogVisible = ref<boolean>(false)
const formData = reactive<any>({})

// 动态列表
const dynamicColumns = ref<any[]>([])
const dynamicList = ref<any[]>([])
const dynamicTotal = ref<number>(0)
const dynamicPageNo = ref<number>(1)
const dynamicPageSize = ref<number>(10)

const open = async (row: any) => {
  dialogVisible.value = true
  Object.assign(formData, row)
  dynamicPageNo.value = 1
  dynamicColumns.value=row?.dynamicData?.tableParams??[]
  dynamicList.value = row?.dynamicData?.list ?? []
  console.log(11111,dynamicList.value)
  // handleDynamicSearch()
}

// const handleDynamicSearch = async () => {
//   const param = {
//     id: formData.id,
//     dataSource: formData.dataSource,
//     pageNo: dynamicPageNo.value,
//     pageSize: dynamicPageSize.value,
//   }

//   // 过滤空数据
//   Object.keys(param).forEach((key) => {
//     if ([null, undefined, ''].includes(param[key])) delete param[key]
//   })

//   try {
//     const res = await NationalSearchApi.getNationalSearchDynamic(param)
//     dynamicColumns.value = res?.tableParams ?? []
//     dynamicList.value = res?.list ?? []
//     dynamicTotal.value = res?.total ?? res?.list?.length ?? 0
//   } catch {
//     dynamicColumns.value = []
//     dynamicList.value = []
//     dynamicTotal.value = 0
//   }
// }

// const handleDynamicPageChange = (val: number) => {
//   dynamicPageNo.value = val
//   handleDynamicSearch()
// }

// const handleDynamicSizeChange = (val: number) => {
//   dynamicPageSize.value = val
//   dynamicPageNo.value = 1
//   handleDynamicSearch()
// }

const handleExport = () => {
  message.success('已导出当前人员查询结果')
}

defineExpose({ open })
</script>
