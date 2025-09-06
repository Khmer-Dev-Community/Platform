// src/services/profile.service.ts
import request from '@/utils/request'

export const ProfileService = () => {
    return {
        getUserProfile(username: string) {
            return request({
                url: `/client/profile/${username}`,
                method: 'get',
                withCredentials: true,
            })
        },
    }
}
