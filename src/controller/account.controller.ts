import { Request, Response } from "express";
import { FundAccountInput } from "../schema/account.schema";
import { fundAccountService } from "../service/account.service";


export const fundAccountController = async (req: Request<{}, {}, FundAccountInput['body']>, res: Response) => {
    try {
        const account = await fundAccountService(req.body)

        return res.status(200).json({ status: 'success', message: 'account funded successfully', data: { account } })
    } catch (err: any) {
        console.log(err)

        return res.status(500).json({ status: 'error', message: 'error funding account', data: null })
    }
}