import request from '@/utils/request'

export function createInterview(userId) {
  return request({
    url: '/interview/create?userId=' + userId,
    method: 'get'
  })
}