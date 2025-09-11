// src/services/auth.service.ts
import request from '@/utils/request'

export const AuthService = () => {
  return {
    AuthProfile() {
      return request({
        url: `/auth02/profile`,
        method: 'get',
        withCredentials: true,
      })
    },
    AuthLogout() {
      return request({
        url: `/auth/logout`,
        method: 'post',
        withCredentials: true,
      })
    },
  }
}
