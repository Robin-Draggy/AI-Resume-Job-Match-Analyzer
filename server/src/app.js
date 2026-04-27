import express from 'express'
import cors from 'cors'

export const app = express()

app.use(cors())
app.use(express.json())

import { router as ResumeRoutes } from "./routes/resume.route.js"

app.use("/api/v1/resume", ResumeRoutes)