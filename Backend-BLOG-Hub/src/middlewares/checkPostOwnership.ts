import { Request, Response, NextFunction } from 'express';
import Post from '../models/post';
import sendResponse from '../utils/response';

export const checkPostOwnership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        // Check if the logged-in user is the author
        if (post.author.toString() !== req.user.id) {
            sendResponse(res, 403, 'Unauthorized to perform this action');
            return;
        }

        // If the user is the owner, proceed to the next handler
        next();
    } catch (error) {
        sendResponse(res, 500, 'Error checking post ownership');
    }
};



// export const updatePost = [
//     checkPostOwnership, 
//     async (req: Request, res: Response): Promise<void> => {
//         try {
//             const { title, content } = req.body;
//             const images = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

//             const post = await Post.findById(req.params.id);
//             if (!post) {
//                 sendResponse(res, 404, 'Post not found');
//                 return;
//             }

//             post.title = title || post.title;
//             post.content = content || post.content;
//             post.images = images.length ? images : post.images;

//             const updatedPost = await post.save();
//             sendResponse(res, 200, 'Post updated successfully', updatedPost);
//         } catch (error) {
//             sendResponse(res, 500, 'Error updating post');
//         }
//     }
// ];