// src/api/postApi.ts
import { ICreatePost, BlogPost, IPostResponse, IGetPostsResponse, IUpdatePost, IGetPostByIdResponse } from '../types'
import api from './clientApi'; // Your API client instance

// Create a new post
export const createPost = async (postData: ICreatePost): Promise<void> => {
  const formData = new FormData();
  formData.append('title', postData.title);
  formData.append('content', postData.content);
  formData.append('category', postData.tag);

  // if (Array.isArray(postData.images)) {
  //   postData.images.forEach(image => formData.append('images', image));
  // }
  if (postData.image1) {
    formData.append('images', postData.image1);
  }
  if (postData.image2) {
    formData.append('images', postData.image2);
  }
  try {
    console.log("formData: ", formData);
    await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Get all posts
export const getPosts = async (): Promise<IGetPostsResponse> => {
  try {
    const response = await api.get<IGetPostsResponse>('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Get post by ID
export const getPostById = async (id: string): Promise<IGetPostByIdResponse> => {
  try {
    const response = await api.get<IGetPostByIdResponse>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};

// Get posts of the logged-in user
export const getUserPosts = async (): Promise<IGetPostsResponse> => {
  try {
    const response = await api.get<IGetPostsResponse>('/posts/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
};

// Update a post
export const updatePost = async (id: string, updatedData: IUpdatePost): Promise<void> => {
  const formData = new FormData();

  if (updatedData.title) formData.append('title', updatedData.title);
  if (updatedData.content) formData.append('content', updatedData.content);
  if (updatedData.image1) {
    formData.append('images', updatedData.image1);
  }
  if (updatedData.image2) {
    formData.append('images', updatedData.image2);
  }
  if (updatedData.removedImages) {
    updatedData.removedImages.forEach((image) => {
      formData.append('removedImages', image);
    });
  }
  try {
    await api.put(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id: string): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
