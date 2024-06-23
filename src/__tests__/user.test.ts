require('dotenv').config()
import karma from '../adjutor/index'
import app from '../app'
import supertest from 'supertest'
import userModel from '../models/user.model'

describe('auth', () => {
    describe('register user route', () => {
        describe('given the user is on karma blacklist', () => {
            it('should return a 400', async () => {
                const karmaMock = jest.spyOn(karma, 'isOnBlacklist')
                        .mockResolvedValueOnce(true)
        
                const payload = {
                    username: 'test_username',
                    email: 'test@email.com',
                    password: 'password123',
                    passwordConfirmation: 'password123',
                }
                
                const { statusCode } = await supertest(app).post('/api/v1/auth/register').send(payload)

                expect(statusCode).toBe(400)
                expect(karmaMock).toHaveBeenCalled()
            })
        })

        describe('given the user is not on karma blacklist and given complete payload', () => {
            it('should return a 201', async () => {
                const karmaMock = jest.spyOn(karma, 'isOnBlacklist')
                        .mockResolvedValueOnce(false)
                
                const userModelMock = jest.spyOn(userModel, 'createUser')
                        .mockResolvedValueOnce({ userId: 1, accountId: 1 })
        
                const payload = {
                    username: 'test_username',
                    email: 'test@email.com',
                    password: 'password123',
                    passwordConfirmation: 'password123',
                }
                
                const { statusCode } = await supertest(app).post('/api/v1/auth/register').send(payload)

                expect(statusCode).toBe(201)
                expect(karmaMock).toHaveBeenCalled()
            })
        })

        describe('given incomplete payload', () => {
            it('should return a 400', async () => {
        
                const payload = {
                    username: 'test_username',
                    email: 'test@email.com',
                    password: 'password123',
                }
                
                const { statusCode } = await supertest(app).post('/api/v1/auth/register').send(payload)

                expect(statusCode).toBe(400)
            })
        })
    })
})