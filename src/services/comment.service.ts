// src/services/post.service.ts
import request from '@/utils/request'

export const CommentService = () => {
  return {
    getPostComment(params: object) {
      return request({
        url: '/posts/list',
        method: 'get',
        params,
        withCredentials: true,
      })
    },
    getPostCommentByID(paramId: number) {
      return request({
        url: `/posts/v/${paramId}`,
        method: 'get',
        withCredentials: true,
      })
    },
    createPostComment(postId: number, data: object) {
      return request({
        url: `/m/${postId}/comments/`,
        method: 'post',
        withCredentials: true,
        data,
      })
    },

    deletePostComment(paramId: number) {
      return request({
        url: `/posts/delete/${paramId}`,
        method: 'delete',
      })
    },
  }
}
