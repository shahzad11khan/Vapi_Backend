import express, { response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes';
import cors from 'cors';
import { getGeminiResponse } from './routes/geminiSeviceRoute';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', routes);
app.post('/chat', async (req , res)=>{
  try {
    console.log(req.body)
   const {text} = req.body;
   console.log(text)
   let geminiResponse = await getGeminiResponse(text); 
   res.status(200).send({geminiResponse})
  } catch (error) {
    console.log(error)
  }
});


// DB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
