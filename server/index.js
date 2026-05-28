import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
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

// swagger docs — also expose raw spec for embedding
app.get('/api-docs/spec', (_req, res) => res.json(swaggerSpec))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Portfolio API Docs',
  customCss: '.swagger-ui .topbar { display: none }',
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
