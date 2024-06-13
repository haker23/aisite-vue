import request from '@/utils/request'

export function queryCounselorList(data) {
  return request({
    url: '/counselor/query',
    method: 'post',
    data
  })
}