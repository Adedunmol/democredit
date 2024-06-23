import db from "../database/database";

interface CreateAccount {
    user_id: string
}

interface FundAccount {
    user_id: string
    amount: number
}

interface FundTransfer {
    user_id: string
    amount: number
}

interface WithdrawFunds {
    user_id: string
    amount: number
}

class Account {
    async createAccount(data: CreateAccount) {
        const [id] = await db('account').insert({ ...data }).returning('id')

        return id
    }

    async fundAccount(data: FundAccount) {

    }

    async transferFunds(data: FundTransfer) {

    }

    async withdrawFunds(data: WithdrawFunds) {

    }
}

export default new Account()