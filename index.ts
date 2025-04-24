import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', routes);

// DB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
