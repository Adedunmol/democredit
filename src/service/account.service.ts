import accountModel from "../models/account.model"

export const fundAccountService = async (data: any) => {
    const { user_id, amount } = data

    return accountModel.fundAccount({ user_id, amount })
}