// src/types/postTypes.ts

export interface ICreatePost {
  title: string;
  content: string;
  tag: string;
  images: File[];
  image1?: File;
  image2?: File;
}

export interface BlogPost {
  id: string; // Or number if your API returns a number
  title: string;
  images: string[];
  content: string;
  author: string;
  category: string;
  createdAt: string;
  readTime: string;
}

export interface IPostResponse {
  data: BlogPost;
}

export interface ICreatePostResponse {
  data: BlogPost;
}

export interface IUpdatePost {
  title?: string;
  content?: string;
  tag?: string;
  removedImages?: string[];
  image1?: File;
  image2?: File;
  images?: File[]; // Optional for update
}

export interface IGetPostsResponse {
  data: BlogPost[];
}

export interface IGetPostByIdResponse {
  data: BlogPost;
}
