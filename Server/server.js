import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import { v2 as cloudinary } from 'cloudinary';
import errorMiddleware from './midlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';
import { server, app } from './Socket/index.js'; 
import connectToDB from './config/DBConnection.js';

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

app.get('/ping', (_req, res) => {
  res.send('Pong');
});

app.use('/api/v1/auth', userRoutes);

app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

app.use(errorMiddleware);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  await connectToDB();
  console.log(`App is running at http://localhost:${PORT}`);
});
