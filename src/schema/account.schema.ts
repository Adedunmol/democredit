import { object, TypeOf, number } from 'zod';


export const fundAccountSchema = object({
    body: object({
        accountId: number({ required_error: 'accountId is required' }),
        amount: number({ required_error: 'amount to be funded is required' }).positive('amount to be deposited cannot be negative')
    })
})

export const transferFundsSchema = object({
    body: object({
        recipientUserId: number({ required_error: 'recipientUserId is required' }),
        amount: number({ required_error: 'amount to be transferred is required' }).positive('amount to be transferred cannot be negative')
    })
})

export const withdrawFundsSchema = object({
    body: object({
        amount: number({ required_error: 'amount to be withdrawn is required' }).positive('amount to be withdrawn cannot be negative')
    })
})

export type FundAccountInput = TypeOf<typeof fundAccountSchema>
export type TransferFundsInput = TypeOf<typeof transferFundsSchema>
export type WithdrawFundsInput = TypeOf<typeof withdrawFundsSchema>