import db from "../database/database";

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

        return id
    }
}

export default new User()