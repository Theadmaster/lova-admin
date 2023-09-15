import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/getAllSentences',
    method: 'post',
    params
  })
}

export function addSentence(params) {
    return request({
      url: '/api/v1/addSentence',
      method: 'post',
      params
    })
}

export function modifySentence(params) {
    return request({
      url: '/api/v1/modifySentence',
      method: 'post',
      params
    })
}

export function deleteSentence(params) {
    return request({
      url: '/api/v1/deleteSentence',
      method: 'post',
      params
    })
}
