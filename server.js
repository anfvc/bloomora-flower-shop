import express from 'express'
import 'express-async-errors'
import authRouter from './routes/authRouter.js'
import cookieParser from 'cookie-parser'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'

const app = express()

await connection();

app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)

app.use('*', (req, res)=>{
    res.status(404).json({msg: 'not found'})
})

app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





