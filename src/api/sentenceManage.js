import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/getAllSentences',
    method: 'post',
    params,
    data: params
  })
}

export function addSentence(data) {
    return request({
      url: '/addSentence',
      method: 'post',
      data
    })
}

export function modifySentence(data) {
    return request({
      url: '/modifySentence',
      method: 'post',
      data
    })
}

export function deleteSentence(data) {
    return request({
      url: '/deleteSentence',
      method: 'post',
      data
    })
}
