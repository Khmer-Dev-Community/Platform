// src/services/post.service.ts
import request from '@/utils/request'

export const PostService = () => {
  return {
    getPostContent(params: object) {
      return request({
        url: '/posts/list',
        method: 'get',
        params,
        withCredentials: true,
      })
    },
    getPostContentByID(paramId: number) {
      return request({
        url: `/posts/v/${paramId}`,
        method: 'get',
        withCredentials: true,
      })
    },
    getPostContentBySlug(slug: string) {
      return request({
        url: `/posts/${slug}`,
        method: 'get',
        withCredentials: true,
      })
    },
    createPostContent(data: object) {
      return request({
        url: '/posts/create',
        method: 'post',
        withCredentials: true,
        data,
      })
    },
    updatePostContent(data: object) {
      return request({
        url: `/posts/${data?.id}`,
        method: 'put',
        data,
        withCredentials: true,
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
