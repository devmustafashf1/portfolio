import express from 'express'
import {createBlog,getBlogById,getPinnedBlogs,getAllBlogs} from '../controllers/blogController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/blog',verifyToken, createBlog)
router.get("/pinned", getPinnedBlogs);     
router.get("/:id", getBlogById);   
router.get("/", getAllBlogs);   


export default router
