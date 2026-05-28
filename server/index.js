import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import contactRoutes from './route/contactRoutes.js'
import blogRoutes from './route/blogRoutes.js'
import authRoutes from './route/authRoutes.js'

const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(cors());

// routes
app.use('/contact', contactRoutes)
app.use('/read', blogRoutes)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
