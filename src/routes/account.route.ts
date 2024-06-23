import { Router } from 'express';
import validateResource from '../middlewares/validate-resource';
import { fundAccountSchema, transferFundsSchema, withdrawFundsSchema } from '../schema/account.schema';
import { fundAccountController, transferFundsController, withdrawFundsController } from '../controller/account.controller';

const router = Router()

router.route('/fund').post(validateResource(fundAccountSchema), fundAccountController)
router.route('/transfer').post(validateResource(transferFundsSchema), transferFundsController)
router.route('/withdraw').post(validateResource(withdrawFundsSchema), withdrawFundsController)

export default router