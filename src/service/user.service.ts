import userModel from "../models/user.model";

export const createUserService = async (data: any) => {
    const { email, username, password } = data

    return userModel.createUser({ email, username, password })
}