import express, { response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes';
import cors from 'cors';
import { getGeminiResponse } from './routes/geminiSeviceRoute';
import path from 'path'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.use('/file', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);
app.post('/api/chat', async (req , res)=>{
  try {
    console.log(req.body)
   const {finalText , SystemPrompt} = req.body;
   let geminiResponse = await getGeminiResponse(finalText , SystemPrompt); 
   res.status(200).send({message:"data successifully recive" , geminiResponse})
  } catch (error) {
    console.log(error)
    res.status(200).send({ error : "somthing went wrong"})
  }
});


// DB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
