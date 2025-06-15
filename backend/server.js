import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();
await connectDB()

//middleware
app.use(cors())
app.use(express.json())


// Routes
app.get('/',(req, res)=>res.send("API is working"))
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)

const PORT= process.env.PORT || 3002;


app.listen(PORT,()=>{
    console.log('Server is running in PORT ' + PORT);
    
})



export default app;

