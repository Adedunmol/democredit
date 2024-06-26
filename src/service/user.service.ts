import userModel from '../models/user.model'
import bcrypt from 'bcrypt'

export const createUserService = async (data: any) => {
    const { email, username, password } = data

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return userModel.createUser({ email, username, password: hashedPassword })
}


export const validatePassword = async ({ password, email }: { email: string, password: string }) => {
    const user = await userModel.findUser(email)

    if (!user) return false
    
    const match = await bcrypt.compare(password, user.password) // user.comparePassword(password)

    if (!match) return false
        
    return user
}