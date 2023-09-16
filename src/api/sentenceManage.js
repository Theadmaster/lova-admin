import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/v1/getAllSentences',
    method: 'post',
    params,
    data: params
  })
}

export function addSentence(data) {
    return request({
      url: '/api/v1/addSentence',
      method: 'post',
      data
    })
}

export function modifySentence(data) {
    return request({
      url: '/api/v1/modifySentence',
      method: 'post',
      data
    })
}

export function deleteSentence(data) {
    return request({
      url: '/api/v1/deleteSentence',
      method: 'post',
      data
    })
}
