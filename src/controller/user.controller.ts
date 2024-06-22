import { Response, Request } from 'express'
import { createUserService } from '../service/user.service'
import { CreateUserInput } from '../schema/user.schema'

export const createUserController = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const id = await createUserService(req.body)

        return res.status(201).json({ status: 'success', message: '',  data: { id } })
    } catch (err: any) {
        console.log(err)
        return res.status(400).json({ status: 'error', message: 'error creating user', data: null })
    }
}