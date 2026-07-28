import express from 'express'
import multer from 'multer'
import rateLimit from 'express-rate-limit'
import {createBlog,getBlogById,getPinnedBlogs,getAllBlogs} from '../controllers/blogController.js'
import { uploadImage } from '../controllers/uploadController.js'
import { improveText, suggestTitle, suggestExcerpt, suggestTags, structureContent, explainPost } from '../controllers/aiController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

// Public endpoint (no auth) — rate-limited per IP since any site visitor can trigger it.
const explainLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests — try again in a few minutes.' },
})

router.post('/blog',verifyToken, createBlog)
router.post('/blog/upload-image', verifyToken, upload.single('image'), uploadImage)
router.post('/blog/ai/improve', verifyToken, improveText)
router.post('/blog/ai/title', verifyToken, suggestTitle)
router.post('/blog/ai/excerpt', verifyToken, suggestExcerpt)
router.post('/blog/ai/tags', verifyToken, suggestTags)
router.post('/blog/ai/structure', verifyToken, structureContent)
router.get('/blog/:id/explain', explainLimiter, explainPost)
router.get("/pinned", getPinnedBlogs);
router.get("/:id", getBlogById);
router.get("/", getAllBlogs);


export default router
