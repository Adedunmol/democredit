import db from "../database/database";

interface CreateAccount {
    user_id: number
}

interface FundAccount {
    account_id: number
    amount: number
}

interface FundTransfer {
    senderAccountId: number
    recipientAccountId: number
    amount: number
}

interface WithdrawFunds {
    user_id: number
    amount: number
}

class Account {
    async createAccount(data: CreateAccount) {
        const [id] = await db('account').insert({ ...data, balance: 0 }).returning('id')

        return id
    }

    async fundAccount(data: FundAccount) {
        const account = await db('account').increment('balance', data.amount).where({ id: data.account_id }).returning('*')

        return account
    }

    async transferFunds(data: FundTransfer) {
        const sender = await db.transaction(async trx => {
            // account id instead
            const sender = await trx('account').decrement('balance', data.amount).where({ id: data.senderAccountId }).returning('*')
            const receiver = await trx('account').increment('balance', data.amount).where({ id: data.recipientAccountId }).returning('*')

            return sender
        })

        return sender
    }

    async withdrawFunds(data: WithdrawFunds) {
        // account id instead
        const account = await db('account').decrement('balance', data.amount).where({ user_id: data.user_id }).returning('*')

        return account
    }

    async getAccount(userId: number) {
        const account = db('account').where({ user_id: userId }).returning('*').first()

        return account
    }
}

export default new Account()