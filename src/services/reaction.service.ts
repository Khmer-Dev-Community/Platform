// src/services/post.service.ts
import request from '@/utils/request'

export const ReactionService = () => {
  return {
    getPostReaction(params: object) {
      return request({
        url: '/posts/list',
        method: 'get',
        params,
        withCredentials: true,
      })
    },
    getPostReactionByID(paramId: number) {
      return request({
        url: `/posts/v/${paramId}`,
        method: 'get',
        withCredentials: true,
      })
    },
    createPostReaction(postId: number, data: object) {
      return request({
        url: `/m/${postId}/reactions/`,
        method: 'post',
        withCredentials: true,
        data,
      })
    },

    deletePostReaction(paramId: number) {
      return request({
        url: `/posts/delete/${paramId}`,
        method: 'delete',
      })
    },
  }
}
