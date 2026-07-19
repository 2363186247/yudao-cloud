import request from '@/config/axios'

export interface SearchDocumentVO {
  id?: string
  title: string
  titleHighlight?: string
  keywords: string[]
  content: string
  contentSnippetHighlight?: string
  score?: number
  extra?: Record<string, any>
  createTime?: Date
}

// 创建文档
export const createSearchDocument = (data: SearchDocumentVO) => {
  return request.post({ url: '/search/create', data })
}

// 修改文档
export const updateSearchDocument = (data: SearchDocumentVO) => {
  return request.put({ url: '/search/update', data })
}

// 删除文档
export const deleteSearchDocument = (id: string) => {
  return request.delete({ url: `/search/delete?id=${id}` })
}

// 获得文档
export const getSearchDocument = (id: string) => {
  return request.get({ url: `/search/get?id=${id}` })
}

// 获得文档分页
export const getSearchDocumentPage = (params: { pageNo: number; pageSize: number; searchType: string; searchKey?: string }) => {
  return request.get({ url: '/search/page', params })
}

// 批量导入文档
export const batchImportSearchDocuments = (data: SearchDocumentVO[]) => {
  return request.post({ url: '/search/batch-import', data })
}

// 离线多语言智能翻译
export const translateText = (data: { text: string; sourceLang: string; targetLang: string }) => {
  return request.post({ url: '/search/translate', data })
}

