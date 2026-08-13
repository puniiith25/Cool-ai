import express from 'express'
import cors from 'cors'
import 'dotenv/config'


import { clerkMiddleware, requireAuth } from '@clerk/express'
const app = express()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())


const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('sever is Live!')
})

app.use(requireAuth())
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})