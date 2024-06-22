import db from "../database/database";

interface CreateAccount {
    user_id: string
}

interface FundAccount {
    user_id: string
    amount: number
}

class Account {
    async createAccout(data: CreateAccount) {

    }

    async fundAccount(data: FundAccount) {

    }
}

export default new Account()