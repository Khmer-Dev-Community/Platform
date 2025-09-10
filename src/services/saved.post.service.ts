// src/services/saved.post.service.ts
import request from '@/utils/request'

export const SavePostService = () => {
  return {
    getSavePost(uername: string, params: object) {
      return request({
        url: `/saved-post/${uername}`,
        method: 'get',
        params,
        withCredentials: true,
      })
    },
    createSavePost(postId: number, data: object) {
      return request({
        url: `/saved-post/`,
        method: 'post',
        withCredentials: true,
        data,
      })
    },

    unSavePost(paramId: number) {
      return request({
        url: `/saved-post/${paramId}`,
        method: 'put',
      })
    },
  }
}
