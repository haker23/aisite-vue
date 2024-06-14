import request from '@/utils/request'

/**
 * 用于存储和分析的客户信息表分页查询
 * @param {*} data
 * @returns
 */
export function queryInterviewRecords(data) {
  return request({
    url: '/interviewrecords/interviewrecords/query',
    method: 'post',
    data
  })
}

