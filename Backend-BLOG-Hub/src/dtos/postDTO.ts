// dtos/PostDTO.ts
export interface PostDTO {
    id: string;
    title: string;
    content: string;
    images: string[];
    category: string;
    author: string; 
    createdAt: string;
    readTime: number;
}
