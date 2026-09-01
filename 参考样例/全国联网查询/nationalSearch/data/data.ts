import { formatDate } from '@sandun/tools'
import { DICT_TYPE, getDictOptions, getDictLabel } from '@/utils/dict'

// 数据来源选项
// export const dataSourceOptions = [
//   { label: '××省业务系统', value: '××省业务系统' },
//   { label: '天津市', value: '天津市' },
//   { label: '全国天津市', value: '全国天津市' },
// ]

// 时间范围选项
export const timeRangeOptions = [
  { label: '近7天', value: '7' },
  { label: '近30天', value: '30' },
  { label: '近90天', value: '90' },
]

// 全国联网查询 - 查询条件
export const nationalSearchSchema = [
  {
    label: '姓名：',
    field: 'name',
    component: 'Input',
    colProps: { span: 6, md: 6, sm: 12, xs: 24 },
    componentProps: {
      placeholder: '请输入',
    },
  },
  {
    label: '证件号码：',
    field: 'idCard',
    component: 'Input',
    colProps: { span: 6, md: 6, sm: 12, xs: 24 },
    componentProps: {
      placeholder: '请输入',
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入证件号码：', trigger: 'change' }],
    },
  },
  {
    label: '手机号码：',
    field: 'phone',
    component: 'Input',
    colProps: { span: 6, md: 6, sm: 12, xs: 24 },
    componentProps: {
      placeholder: '请输入',
    },
  },
  {
    label: '数据来源：',
    field: 'dataSource',
    component: 'Select',
    colProps: { span: 6, md: 6, sm: 12, xs: 24 },
    componentProps: {
      placeholder: '请选择',
      clearable: true,
      options: getDictOptions(DICT_TYPE.KYQB_QGLWCX_SJLY)
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入证件号码：', trigger: 'change' }],
    },
  },
  {
    label: '时间范围：',
    field: 'timeRange',
    component: 'Select',
    colProps: { span: 6, md: 6, sm: 12, xs: 24 },
    componentProps: {
      placeholder: '请选择',
      clearable: true,
      options: getDictOptions(DICT_TYPE.KYQB_XXCX_SXXQ_FBSJ)
    },
  },
  {
    label: '关键词：',
    field: 'keyword',
    component: 'Input',
    colProps: { span: 6, md: 6, sm: 12, xs: 24 },
    componentProps: {
      placeholder: '请输入',
    },
  },
]

// 全国联网查询 - 列表列定义
export const nationalColumns = [
  { label: '序号', field: 'index', type: 'index', width: 60, fixed: 'left' },
  { label: '姓名', field: 'name', width: 100, fixed: 'left' },
  { label: '身份证号', field: 'idCard', width: 180, ellipsis: true },
  { label: '手机号码', field: 'phone', width: 140, ellipsis: true },
  { label: '数据来源', field: 'dataSource', minWidth: 120, ellipsis: true, formatter: (row) => getDictLabel(DICT_TYPE.KYQB_QGLWCX_SJLY, row.dataSource) },
  { label: '关联情报', field: 'relatedInfo', width: 120 },
  { label: '操作', field: 'action', width: 100, fixed: 'right' },
]

// 全国联网查询 - 详情-基础信息
export const basicInfoSchema = [
  { field: 'name', label: '姓名：' },
  { field: 'gender', label: '性别：' },
  { field: 'birthDate', label: '出生日期：' },
  { field: 'idCard', label: '身份证号：' },
  { field: 'phone', label: '手机号码：' },
  { field: 'householdRegister', label: '户籍地：' },
  { field: 'localArea', label: '当前地区：' },
]

// 全国联网查询 - 详情-联网信息
export const networkInfoSchema = [
  { field: 'dataSource', label: '数据来源：' },
  { field: 'updateTime', label: '更新时间：' },
  // { field: 'relatedInfo', label: '关联情报：' },
  // { field: 'status', label: '状态：' },
]

// 状态映射
export const statusMap: Record<string, { label: string; type: string }> = {
  '1': { label: '已关联', type: 'success' },
  '2': { label: '待核验', type: 'warning' },
  '3': { label: '未关联', type: 'info' },
}

// 格式化时间戳
export const formatTimestamp = (val: any) => {
  if (!val) return '-'
  return formatDate(val, 'YYYY-MM-DD HH:mm:ss')
}
