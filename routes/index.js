import express from 'express';
import configureMyApi from './api';

const router = express.Router();
configureMyApi(router);

export default router;