import { Router } from 'express';
import { createUserController, loginController } from '../controller/user.controller';
import validateResource from '../middlewares/validate-resource';
import { createUserSchema, loginSchema } from '../schema/user.schema';

const router = Router()

router.route('/register').post(validateResource(createUserSchema), createUserController)
router.route('/login').post(validateResource(loginSchema), loginController)

export default router