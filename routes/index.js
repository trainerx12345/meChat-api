const authRouter = require('./Auth.js');
const usersRouter = require('./User.js');
const messageRouter = require('./Message.js');

const express = require('express');
const router = express.Router();

router.use(`api/v1/auth`, authRouter);
// CRUD API
router.use(`'api/v1/user`, usersRouter);
router.use(`'api/v1/message`, messageRouter);

module.exports =  router;
