import accountModel from "../models/account.model"

class AccountService {

    createAccount(data: any) {
        const { userId: user_id } = data
    
        return accountModel.createAccount({ user_id })
    }

    fundAccount(data: any) {
        const { userId: user_id, amount } = data
    
        return accountModel.fundAccount({ user_id, amount })
    }

    async transferFunds(data: any) {
        const { senderUserId, recipientUserId, amount } = data
    
        const account = await accountModel.getAccount(senderUserId)
    
        // custom error insufficient balance
        if (account && amount > account.balance) throw new Error('Insuffucient balance')
    
        return accountModel.transferFunds({ senderUserId, recipientUserId, amount })
    }

    async withdrawFunds(data: any) {
        const { userId: user_id, amount } = data
    
        const account = await accountModel.getAccount(user_id)
    
        if (account && amount > account.balance) throw new Error('Insuffucient balance')
    
        return accountModel.withdrawFunds({ user_id, amount })
    }
}

// include validation during transfer

export default new AccountService()