import request from '@/utils/request'

/**
 * 用于存储和分析的客户信息表分页查询
 * @param {*} data
 * @returns
 */
export function queryCustomerAnalysis(data) {
  return request({
    url: '/customeranalysis/customeranalysis/query',
    method: 'post',
    data
  })
}

/**
 * 用于存储和分析的客户信息表新增或修改
 * @param {*} data
 * @returns
 */
export function saveCustomerAnalysis(data) {
  return request({
    url: '/customeranalysis/customeranalysis/query',
    method: 'post',
    data
  })
}

/**
 * 用于存储和分析的客户信息表新增或修改
 */
export function getCustomerAnalysis(id) {
  return request({
    url: '/customeranalysis/customeranalysis/' + id,
    method: 'get'
  })
}