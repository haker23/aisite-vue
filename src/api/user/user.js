import request from '@/utils/request'

/**
 * 更新用户信息
 * @param {*} data 
 * @returns 
 */
export function updateUser(data) {
  return request({
    url: '/update',
    method: 'post',
    data
  })
}