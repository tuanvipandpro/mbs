import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'

const app = express()
app.use(cors())
dotenv.config()
const port = process.env.PORT || 3000

app.use(express.json())


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connect DB successfully !!!'))
  .catch(e => {
    console.error('Cannot connect DB !!!', e)
    process.exit(1)
})

routes(app)

app.listen(port, () => {
  console.log(`Server start in PORT: ${port} (${new Date().toLocaleString()})`)
})