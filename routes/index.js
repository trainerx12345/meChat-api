import { Router } from 'express';

import authRouter from './Auth.js';
import usersRouter from './User.js';
import messageRouter from './Message.js';

const router = Router();

router.use(`api/v1/auth`, authRouter);
// CRUD API
router.use(`'api/v1/user`, usersRouter);
router.use(`'api/v1/message`, messageRouter);

export default router;
