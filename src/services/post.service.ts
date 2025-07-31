import request from '@/utils/request'
export function PostService() {
  return {
    getPostContent(params: object) {
      return request({
        url: '/posts/list',
        method: 'get',
        params,
      })
    },
    getPostContentByID(paramId: number) {
      return request({
        url: `/posts/${paramId}`,
        method: 'get',
      })
    },
    createPostContent(data: object) {
      return request({
        url: '/posts/create',
        method: 'post',
        data,
      })
    },
    updatePostContent(data: object) {
      return request({
        url: '/posts/update',
        method: 'put',
        data,
      })
    },
    deletePostContent(paramId: number) {
      return request({
        url: `/posts/delete/${paramId}`,
        method: 'delete',
      })
    },
  }
}
