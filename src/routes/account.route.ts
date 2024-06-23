import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { fundAccountSchema } from '../schema/account.schema';

const router = Router()

router.route('/fund').post(validateResource(fundAccountSchema))

export default router