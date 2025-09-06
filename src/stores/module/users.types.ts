// src/stores/module/users.types.ts
export interface UserData {
  id: number
  fname: string
  lname: string
  username: string
  email: string
  phone: string
  sex: string
  status: boolean
  description: string
  github_id: string
  avatar_url: string
  name: string
  createdAt: string
  updatedAt: string
  roleid?: number
  companyId?: number
  [key: string]: any
}

export interface BackendResponse<T> {
  statusCode: number
  message: string
  data: T
}

export interface LoginResponse {
  message: string
  statusCode: number
}
