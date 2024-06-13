import request from '@/utils/request'

/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 注册
 * @param {*} data 
 * @returns 
 */
export function signUp(data) {
  return request({
    url: '/signup',
    method: 'post',
    data
  })
}