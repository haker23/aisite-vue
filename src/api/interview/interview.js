import request from '@/utils/request'

export function createInterview(userId) {
  return request({
    url: '/interview/create?userId=' + userId,
    method: 'get'
  })
}

export function chat(prompt) {
  return request({
    url: '/interview/chat/' + prompt,
    method: 'get'
  })
}