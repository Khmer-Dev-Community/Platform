// src/stores/selected-post.ts

import { defineStore } from 'pinia';
export const useSelectedPostStore = defineStore('selected-post', {
    state: () => ({
        selectedPost: null as any | null,
    }),
    actions: {
        setSelectedPost(post: any) {
            this.selectedPost = post;
        }
    }
});