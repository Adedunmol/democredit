import { InsufficientBalanceError, AccountNotFoundError, ForbiddenError } from "../errors/account"
import accountModel from "../models/account.model"

class AccountService {

    createAccount(data: any) {
        const { userId } = data
    
        return accountModel.createAccount({ userId })
    }

    fundAccount(data: any) {
        const { accountId, amount } = data
    
        return accountModel.fundAccount({ accountId, amount })
    }

    async transferFunds(data: any) {
        const { senderAccountId, recipientAccountId, amount, senderUserId } = data
    
        const account = await accountModel.getAccount(senderAccountId)

        if (!account) throw new AccountNotFoundError()

        if (account.user_id !== senderUserId) throw new ForbiddenError()
    
        // custom error insufficient balance
        if (amount > account.balance) throw new InsufficientBalanceError()
    
        return accountModel.transferFunds({ senderAccountId, recipientAccountId, amount })
    }

    async withdrawFunds(data: any) {
        const { accountId, amount, senderUserId } = data
    
        const account = await accountModel.getAccount(accountId)
        
        if (!account) throw new AccountNotFoundError()

        if (account.user_id !== senderUserId) throw new ForbiddenError()
    
        if (amount > account.balance) throw new InsufficientBalanceError()
    
        return accountModel.withdrawFunds({ accountId, amount })
    }
}

// include validation during transfer

export default new AccountService()