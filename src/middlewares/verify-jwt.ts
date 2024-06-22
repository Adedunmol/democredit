import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string

    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ status: 'error', message: 'You do not have the access token', data: null })

    const accessToken = authHeader.split(' ')[1]

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string,
        {},
        (err: any, data) => {
            if (err) return res.status(401).json({ status: 'error', message: 'You are sending a bad token', data: null })
            let decodedData = data as any

            const dataObj = {
                id: decodedData.UserInfo.id,
            }

            // @ts-ignore
            req.user = dataObj
            
            next()
        }
    )
}