import express from 'express'
import userRouter from './routes/user.route'
import accountRouter from './routes/account.route'
import { verifyJWT } from './middlewares/verify-jwt'

const app = express()
app.use(express.json())

app.use('/api/v1/auth', userRouter)

app.use(verifyJWT)
app.use('/api/v1/accounts', accountRouter)

export default app