import db from "../database/database";
import accountModel from "./account.model";

interface CreateUser {
    email: string
    username: string
    password: string
}

class User {
    async createUser(data: CreateUser) {
        const [id] = await db('user').insert({
            ...data
        }).returning('id')

        const accountId = await accountModel.createAccount({ userId: id })

        return { userId: id, accountId }
    }

    async findUser(email: string) {
        const user = await db('user').where({ email })

        return user[0]
    }
}

export default new User()