import db from "../database/database";

interface CreateAccount {
    userId: number
}

interface FundAccount {
    accountId: number
    amount: number
}

interface FundTransfer {
    senderAccountId: number
    recipientAccountId: number
    amount: number
}

interface WithdrawFunds {
    accountId: number
    amount: number
}

class Account {
    async createAccount(data: CreateAccount) {
        const [id] = await db('account').insert({ user_id: data.userId, balance: 0 }).returning('id')

        return id
    }

    async fundAccount(data: FundAccount) {
        const account = await db.transaction(async trx => {
            const account = await trx('account').increment('balance', data.amount).where({ id: data.accountId })
            const updatedAccount = trx('account').select('id', 'balance').where({ id: data.accountId }).first()
            return updatedAccount
        })

        return account
    }

    async transferFunds(data: FundTransfer) {
        const sender = await db.transaction(async trx => {
            // account id instead
            const sender = await trx('account').decrement('balance', data.amount).where({ id: data.senderAccountId }).returning('*')
            const receiver = await trx('account').increment('balance', data.amount).where({ id: data.recipientAccountId }).returning('*')
            const updatedSenderAccount = trx('account').select('id', 'balance').where({ id: data.senderAccountId }).first()

            return updatedSenderAccount
        })

        return sender
    }

    async withdrawFunds(data: WithdrawFunds) {
        const account = await db.transaction(async trx => {
            const account = await trx('account').decrement('balance', data.amount).where({ id: data.accountId }).returning('*')
            const updatedAccount = trx('account').select('id', 'balance').where({ id: data.accountId }).first()

            return updatedAccount
        })

        return account
    }

    async getAccount(accountId: number) {
        const account = db('account').where({ id: accountId }).returning('*').first()

        return account
    }
}

export default new Account()