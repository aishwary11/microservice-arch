import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import { rateLimit } from 'express-rate-limit';
import errorHandler from './common/middleware/errorhandler';
import logger from './common/middleware/logger';
import userRoutes from './routes/user.routes';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(rateLimit({ windowMs: 1 * 60 * 1000, limit: 10 }));
app.use(express.json());
app.use(errorHandler);
app.use(logger);
app.use('/user', userRoutes);
// app.use(isAuthenticated);

app.listen(port, () => console.log(`Server Start at ${port}`));
