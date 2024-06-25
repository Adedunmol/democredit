import { InsuffucientBalanceError } from "../errors/insufficient-balance"
import accountModel from "../models/account.model"

class AccountService {

    createAccount(data: any) {
        const { userId: user_id } = data
    
        return accountModel.createAccount({ user_id })
    }

    fundAccount(data: any) {
        const { accountId: account_id, amount } = data
    
        return accountModel.fundAccount({ account_id, amount })
    }

    async transferFunds(data: any) {
        const { senderAccountId, recipientAccountId, amount, senderUserId } = data
    
        const account = await accountModel.getAccount(senderAccountId)

        if (!account) throw new Error('No account with this account id')

        if (account.user_id !== senderUserId) throw new Error('Account does not belong to sender')
    
        // custom error insufficient balance
        if (amount > account.balance) throw new InsuffucientBalanceError()
    
        return accountModel.transferFunds({ senderAccountId, recipientAccountId, amount })
    }

    async withdrawFunds(data: any) {
        const { userId: user_id, amount } = data
    
        const account = await accountModel.getAccount(user_id)
    
        if (account && amount > account.balance) throw new InsuffucientBalanceError()
    
        return accountModel.withdrawFunds({ user_id, amount })
    }
}

// include validation during transfer

export default new AccountService()