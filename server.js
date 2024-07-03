import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import cookieParser from 'cookie-parser'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)

app.use('*', (req, res)=>{
    res.status(404).json({msg: 'not found'})
})

app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}...`);
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}