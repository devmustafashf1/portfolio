import express from 'express'
import { createWork, getWorkById, getAllWorks } from '../controllers/workController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

// POST /works/        -> create a new work (protected)
router.post('/', verifyToken, createWork)

// GET /works/:id      -> get a single work
router.get('/:id', getWorkById)

// GET /works/         -> get all works
router.get('/', getAllWorks)

export default router
