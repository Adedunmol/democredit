import accountModel from "../models/account.model"

export const createAccountService = async (data: any) => {
    const { userId: user_id } = data

    return accountModel.createAccount({ user_id })
}

export const fundAccountService = async (data: any) => {
    const { userId: user_id, amount } = data

    return accountModel.fundAccount({ user_id, amount })
}

export const transferFundsService = async (data: any) => {
    const { senderUserId, recipientUserId, amount } = data

    const account = await accountModel.getAccount(senderUserId)

    if (amount > account.balance) throw new Error('Insuffucient balance')

    return accountModel.transferFunds({ senderUserId, recipientUserId, amount })
}

export const withdrawFundsService = async (data: any) => {
    const { userId: user_id, amount } = data

    return accountModel.withdrawFunds({ user_id, amount })
}