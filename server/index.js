import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import contactRoutes from './route/contactRoutes.js'
import blogRoutes from './route/blogRoutes.js'
import authRoutes from './route/authRoutes.js'
import workRoutes from './route/workRoutes.js'
import { ensureStorageBucket } from './config/ensureStorageBucket.js'

const app = express()
const port = process.env.PORT || 5000

ensureStorageBucket().catch((err) => console.warn('Storage bucket setup skipped:', err.message))

// middleware
app.use(express.json({ limit: '2mb' }))
app.use(cors());

// routes
const apiRouter = express.Router()
apiRouter.use('/contact', contactRoutes)
apiRouter.use('/read', blogRoutes)
apiRouter.use('/auth', authRoutes)
apiRouter.use('/works', workRoutes)

app.use('/api', apiRouter)
app.use('/', apiRouter)

// swagger docs — also expose raw spec for embedding
app.get('/api-docs/spec', (_req, res) => res.json(swaggerSpec))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Portfolio API Docs',
  customCss: '.swagger-ui .topbar { display: none }',
}))

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
