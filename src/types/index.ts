export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  following?: string[]
  followers?: string[]
  createdAt: string
}

export interface Post {
  id: string
  content: string
  author: User
  likes: string[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  content: string
  author: User
  postId: string
  createdAt: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  bio?: string
}

export interface CreatePostData {
  content: string
}
