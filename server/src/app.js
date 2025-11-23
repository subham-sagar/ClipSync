import express from 'express';
import '@dotenvx/dotenvx/config';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import contentRouter from './routes/content.routes.js';
import cookieParser from 'cookie-parser';
import publicDashboardRouter from "./routes/publicDashboard.routes.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

//routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);
app.use("/api/v1/content", publicDashboardRouter);

export { app };