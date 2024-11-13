import { Request, Response } from 'express';
import Post from '../models/post';
import sendResponse from '../utils/response';
import { PostDTO } from '../dtos/postDTO';

// Helper function to format the response data
const formatPostResponse = (post: any): PostDTO => {
    const createdAtFormatted = new Date(post.createdAt).toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD format
    // const updatedAtFormatted = new Date(post.updatedAt).toLocaleDateString('en-CA'); // Formatting updatedAt similarly
    return {
        id: post._id,
        title: post.title,
        content: post.content,
        images: post.images,
        category: post.category,
        author: post.author.firstName ? `${post.author.firstName} ${post.author.lastName}` : 'Anonymous',
        createdAt: createdAtFormatted,
        readTime: post.content.length > 0 ? Math.ceil(post.content.length / 20) : 0,
    };
};


// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            sendResponse(res, 401, 'Unauthorized');
            return;
        }

        const { title, content, category } = req.body;
        const images = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];
        console.log("images: ", images);

        const post = new Post({
            title,
            content,
            images,
            category,
            author: req.user.id, // Assuming req.user is populated from authentication middleware
        });

        const savedPost = await post.save();
        sendResponse(res, 201, 'Post created successfully', formatPostResponse(savedPost));
    } catch (error) {
        sendResponse(res, 500, 'Error creating post');
    }
};

// Get all posts
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find().populate('author', 'firstName lastName');
        const formattedPosts = posts.map(post => formatPostResponse(post));
        sendResponse(res, 200, 'Posts retrieved successfully', formattedPosts);
    } catch (error) {
        sendResponse(res, 500, 'Error retrieving posts');
    }
};

// Get posts by the logged-in user
export const getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            sendResponse(res, 401, 'Unauthorized');
            return;
        }
        const posts = await Post.find({ author: req.user.id });
        const formattedPosts = posts.map(post => formatPostResponse(post));
        sendResponse(res, 200, 'User posts retrieved successfully', formattedPosts);
    } catch (error) {
        sendResponse(res, 500, 'Error retrieving user posts');
    }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'firstName lastName');
        if (!post) {
            sendResponse(res, 404, 'Post not found');
            return;
        }
        sendResponse(res, 200, 'Post retrieved successfully', formatPostResponse(post));
    } catch (error) {
        sendResponse(res, 500, 'Error retrieving post');
    }
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            sendResponse(res, 401, 'Unauthorized');
            return;
        }

        const { title, content, removedImages } = req.body;
        const images = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

        // Find the post by ID
        const post = await Post.findById(req.params.id);
        if (!post) {
            sendResponse(res, 404, 'Post not found');
            return;
        }

        // Check if the logged-in user is the author of the post
        if (post.author.toString() !== req.user.id) {
            sendResponse(res, 403, 'Unauthorized to update this post');
            return;
        }

        // Update the title and content if provided
        post.title = title || post.title;
        post.content = content || post.content;

        // Handle image removal: Remove the images that are in the `removedImages` array
        if (removedImages && removedImages.length > 0) {
            // Remove the images from the `post.images` array
            post.images = post.images.filter(image => !removedImages.includes(image));
        }

        // Handle new image uploads: Add the newly uploaded images to the `post.images` array
        if (images.length > 0) {
            post.images.push(...images);
        }

        // Save the updated post
        const updatedPost = await post.save();

        // Send the response with the updated post
        sendResponse(res, 200, 'Post updated successfully', formatPostResponse(updatedPost));
    } catch (error) {
        sendResponse(res, 500, 'Error updating post');
    }
};


// Delete a post by ID
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            sendResponse(res, 401, 'Unauthorized');
            return;
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            sendResponse(res, 404, 'Post not found');
            return;
        }

        if (post.author.toString() !== req.user.id) {
            sendResponse(res, 403, 'Unauthorized to delete this post');
            return;
        }

        await Post.findByIdAndDelete(req.params.id);
        sendResponse(res, 200, 'Post deleted successfully');
    } catch (error) {
        sendResponse(res, 500, 'Error deleting post');
    }
};
