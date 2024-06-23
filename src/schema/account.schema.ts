import { object, TypeOf, number } from 'zod';


export const fundAccountSchema = object({
    body: object({
        amount: number({ required_error: 'amount to be funded is required' }).positive('amount to be deposited cannot be negative')
    })
})

export type FuncAccountInput = TypeOf<typeof fundAccountSchema>