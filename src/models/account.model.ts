import db from "../database/database";

interface CreateAccount {
    user_id: string
}

interface GetAccount {
    user_id: string
}

interface FundAccount {
    user_id: string
    amount: number
}

interface FundTransfer {
    senderUserId: string
    recipientUserId: string
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
        const account = await db('account').increment('balance', data.amount).where({ user_id: data.user_id }).returning('*').first()

        return account
    }

    async transferFunds(data: FundTransfer) {
        const sender = await db.transaction(async trx => {
            const sender = await trx('account').decrement('balance', data.amount).where({ user_id: data.senderUserId }).returning('*').first()
            const receiver = await trx('account').increment('balance', data.amount).where({ user_id: data.recipientUserId }).returning('*').first()

            return sender
        })

        return sender
    }

    async withdrawFunds(data: WithdrawFunds) {
        const account = await db('account').decrement('balance', data.amount).where({ user_id: data.user_id }).returning('*').first()

        return account
    }

    async getAccount(data: GetAccount) {
        const account = db('account').where({ user_id: data.user_id }).returning('*').first()

        return account
    }
}

export default new Account()