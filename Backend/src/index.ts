import express from 'express';
import cors from 'cors';
import ConnectedDB from './infrastructure/db';
import dotenv from "dotenv";
import usersRouter from './api/user';
import placesRouter from './api/places';
import bookingRouter from './api/booking';
import GlobalErrorHandlingMiddleware from './api/middleware/global-error-handling-middleware';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
ConnectedDB();

app.use("/api/users",usersRouter);
app.use("/api/places",placesRouter);
app.use("/api/booking",bookingRouter);

app.use(GlobalErrorHandlingMiddleware);

const PORT = 6000;
app.listen(PORT , () => 
  console.log(`Server is running on port ${PORT}....`)
);

