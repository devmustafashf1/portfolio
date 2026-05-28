import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import contactRoutes from './route/contactRoutes.js'

const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use(cors());

// routes
app.use('/contact', contactRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
