// src/types/posts.ts

export interface Post {
  id: number
  title: string
  content: string
  summary: string
  author: string
  createdAt: Date
  updatedAt: Date
}
export interface JobListResponse {
  jobs: Post[] // The array of posts
  totalCount: number // The total number of posts available
}

export interface JobQueryParams {
  page: number
  limit: number
  sortBy?: string // Optional property
  filter?: string // Optional property
}

declare module '@/services/profile.service'
