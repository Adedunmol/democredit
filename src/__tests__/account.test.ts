require('dotenv').config()
import app from '../app'
import supertest from 'supertest'
import accountModel from '../models/account.model'
import jwt from 'jsonwebtoken'

describe('account', () => {
    describe('fund account route', () => {
        describe('given amount is negative', () => {
            it('should return a 400', async () => {
                const userPayload = { id: 1, email: 'test@email.com', username: 'test_username' }
                const token = jwt.sign({ UserInfo: { ...userPayload }}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

                const payload = { amount: -100 }

                const { statusCode } = await supertest(app).post('/api/v1/accounts/fund/').send(payload).set('Authorization', `Bearer ${token}`)

                expect(statusCode).toBe(400)
            })
        })

        describe('given user not signed in', () => {
            it('should return a 401', async () => {
                const userPayload = { id: 1, email: 'test@email.com', username: 'test_username' }
                const token = jwt.sign({ UserInfo: { ...userPayload }}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

                const payload = { amount: -100 }

                const { statusCode } = await supertest(app).post('/api/v1/accounts/fund/').send(payload)

                expect(statusCode).toBe(401)
            })
        })

        describe('given amount not negative and user is signed in', () => {
            it('should return a 200', async () => {
                const account = { id: 1, balance: 100, user_id: 1 }
                const accountModelMock = jest.spyOn(accountModel, 'fundAccount')
                                .mockResolvedValueOnce(account)

                const userPayload = { id: 1, email: 'test@email.com', username: 'test_username' }
                const token = jwt.sign({ UserInfo: { ...userPayload }}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

                const payload = { amount: 100 }

                const { statusCode } = await supertest(app).post('/api/v1/accounts/fund/').send(payload).set('Authorization', `Bearer ${token}`)

                expect(statusCode).toBe(200)
                expect(accountModelMock).toHaveBeenCalled()
            })
        })
    })

    describe('transfer fund route', () => {
        describe('given amount is negative', () => {
            it('should return a 400', async () => {
                const userPayload = { id: 1, email: 'test@email.com', username: 'test_username' }
                const token = jwt.sign({ UserInfo: { ...userPayload }}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

                const payload = { amount: -100, recipientUserId: 2 }

                const { statusCode } = await supertest(app).post('/api/v1/accounts/transfer/').send(payload).set('Authorization', `Bearer ${token}`)

                expect(statusCode).toBe(400)
            })
        })

        describe('given the amount in account is less than amount to be transferred', () => {
            it('should return a 400', async () => {
                const account = { id: 1, balance: 100, user_id: 1 }

                const accountModelMock = jest.spyOn(accountModel, 'fundAccount')
                .mockResolvedValueOnce(account)

                const userPayload = { id: 1, email: 'test@email.com', username: 'test_username' }
                const token = jwt.sign({ UserInfo: { ...userPayload }}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

                const payload = { amount: 150, recipientUserId: 2 }

                const { statusCode } = await supertest(app).post('/api/v1/accounts/transfer/').send(payload).set('Authorization', `Bearer ${token}`)

                expect(statusCode).toBe(400)
                expect(accountModelMock).toHaveBeenCalled()
            })
        })

        describe('given the amount in account is equal or greater than amount to be transferred', () => {
            it('should return a 200', async () => {
                const account = { id: 1, balance: 100, user_id: 1 }

                const fundMock = jest.spyOn(accountModel, 'fundAccount')
                .mockResolvedValueOnce(account)

                const transferMock = jest.spyOn(accountModel, 'transferFunds')
                .mockResolvedValueOnce({ ...account, balance: 0 })

                const userPayload = { id: 1, email: 'test@email.com', username: 'test_username' }
                const token = jwt.sign({ UserInfo: { ...userPayload }}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

                const payload = { amount: 100, recipientUserId: 2 }

                const { statusCode } = await supertest(app).post('/api/v1/accounts/transfer/').send(payload).set('Authorization', `Bearer ${token}`)

                expect(statusCode).toBe(200)
                expect(fundMock).toHaveBeenCalled()
                expect(transferMock).toHaveBeenCalled()
            })
        })
    })
})