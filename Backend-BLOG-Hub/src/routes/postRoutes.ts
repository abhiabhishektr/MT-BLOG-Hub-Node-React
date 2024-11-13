import express from 'express';
import {
    createPost,
    getPosts,
    updatePost,
    getPostById,
    deletePost,
    getUserPosts,
} from '../controllers/postController';
import upload from '../middlewares/upload'; 

const router = express.Router();

// Post Routes
router.post('/', upload.array('images'), createPost);     
router.get('/', getPosts);                                
router.get('/user', getUserPosts);                        
router.get('/:id', getPostById);                          
router.put('/:id', upload.array('images'), updatePost);   
router.delete('/:id', deletePost);                        

export default router;
