import userModel from '../models/user.model'
import bcrypt from 'bcrypt'

export const createUserService = async (data: any) => {
    const { email, username, password } = data

    return userModel.createUser({ email, username, password })
}


export const validatePassword = async ({ password, email }: { email: string, password: string }) => {
    const user = await userModel.findUser(email)

    if (!user) return false
    
    const match = await bcrypt.compare(password, user.password) // user.comparePassword(password)

    if (!match) return false
        
    return user
}