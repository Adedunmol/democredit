import accountModel from "../models/account.model"

export const fundAccountService = async (data: any) => {
    const { user_id, amount } = data

    return accountModel.fundAccount({ user_id, amount })
}

export const transferFundsService = async (data: any) => {
    const { senderUserId, recipientUserId, amount } = data

    const account = await accountModel.getAccount(senderUserId)

    if (amount > account.balance) throw new Error('Insuffucient balance')

    return accountModel.transferFunds({ senderUserId, recipientUserId, amount })
}