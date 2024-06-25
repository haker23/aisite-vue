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

export function save(data) {
  return request({
    url: '/interviewrecords/interviewrecords/save',
    method: 'post',
    data
  })
}

/**
 * 存储咨询访谈详细记录的表获取单条  interviewrecords  interviewrecords
 */
export function getInterviewRecords(id) {
  return request({
    url: '/interviewrecords/interviewrecords/' + id,
    method: 'get'
  })
}

/**
 * 存储咨询访谈详细记录的表新增或修改
 */
export function saveInterviewRecords(data) {
  return request({
    url: '/interviewrecords/interviewrecords/save',
    method: 'post',
    data
  })
}

/**
 * 存储咨询访谈详细记录的表删除
 */
export function deleteInterviewRecords(data) {
  return request({
    url: '/interviewrecords/interviewrecords/delete',
    method: 'post',
    data
  })
}
