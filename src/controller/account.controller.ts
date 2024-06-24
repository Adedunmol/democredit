import { Request, Response } from "express";
import { FundAccountInput, TransferFundsInput, WithdrawFundsInput } from "../schema/account.schema";
import accountService from "../service/account.service";
import { InsuffucientBalanceError } from "../errors/insufficient-balance";


export const fundAccountController = async (req: Request<{}, {}, FundAccountInput['body']>, res: Response) => {
    try {
        // @ts-ignore
        const account = await accountService.fundAccount({ ...req.body, userId: req.user.id })

        return res.status(200).json({ status: 'success', message: 'account funded successfully', data: { account } })
    } catch (err: any) {
        console.log(err)

        return res.status(500).json({ status: 'error', message: 'error funding account', data: null })
    }
}

export const transferFundsController = async (req: Request<{}, {}, TransferFundsInput['body']>, res: Response) => {
    try {
        // @ts-ignore
        const account = await accountService.transferFunds({ ...req.body, senderUserId: req.user.id })

        return res.status(200).json({ status: 'success', message: 'transaction successful', data: { account } })
    } catch (err: any) {
        if (err instanceof InsuffucientBalanceError) {
            return res.status(400).json({ status: 'error', message: err.message, data: null })
        }

        return res.status(500).json({ status: 'error', message: err.message, data: null })
    }
}

export const withdrawFundsController = async (req: Request<{}, {}, WithdrawFundsInput['body']>, res: Response) => {
    try {
        // @ts-ignore
        const account = await accountService.withdrawFunds({ ...req.body, userId: req.user.id })

        return res.status(200).json({ status: 'success', message: 'withdraw successful', data: { account } })
    } catch (err: any) {
        if (err instanceof InsuffucientBalanceError) {
            return res.status(400).json({ status: 'error', message: err.message, data: null })
        }
        
        return res.status(500).json({ status: 'error', message: err.message, data: null })
    }
}