import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import errorHandler from './common/middleware/errorhandler';
import logger from './common/middleware/logger';
import { cacheMapData } from './common/utils/commonutils';
import { successResp } from './common/utils/responsehelper';
import userRoutes from './routes/user.routes';

const app: Express = express();
const port = process.env.PORT;

app.use(rateLimit({ windowMs: 1 * 60 * 1000, limit: 10 }));
app.use(express.json());
app.use(errorHandler);
app.use(logger);
app.get('/', async (req: Request, res: Response) => successResp(res, 200, 'Send Data', await cacheMapData('https://jsonplaceholder.typicode.com/posts')));
app.use('/user', userRoutes);
// app.use(isAuthenticated);

app.listen(port, () => console.log(`Server Start at ${port}`));
