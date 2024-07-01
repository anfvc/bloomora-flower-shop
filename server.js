import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

app.use('*', (req, res)=>{
    res.status(404).json({msg: 'not found'})
})


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