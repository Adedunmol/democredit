import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { fundAccountSchema } from '../schema/account.schema';
import { fundAccountController } from '../controller/account.controller';

const router = Router()

router.route('/fund').post(validateResource(fundAccountSchema), fundAccountController)

export default router