import { Router } from 'express';
import { createUserController } from '../controller/user.controller';

const router = Router()

router.route('/register').post(createUserController)

export default router