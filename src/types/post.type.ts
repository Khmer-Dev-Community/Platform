// src/types/posts.ts

/**
 * Defines the structure of a single post object.
 * This should match the properties returned by your API for a single post.
 */
export interface Post {
  id: number;
  title: string;
  content: string;
  summary: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Defines the structure of the API response when fetching a list of jobs/posts.
 * This typically includes an array of posts and a total count for pagination.
 */
export interface JobListResponse {
  jobs: Post[]; // The array of posts
  totalCount: number; // The total number of posts available
}

/**
 * Defines the structure for the query parameters sent to the API
 * when requesting a list of jobs.
 */
export interface JobQueryParams {
  page: number;
  limit: number;
  sortBy?: string; // Optional property
  filter?: string; // Optional property
}