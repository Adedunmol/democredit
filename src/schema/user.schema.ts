import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        username: string({ required_error: 'username is required' }),
        email: string({ required_error: 'email is required' }).email('Should be a valid email'),
        password: string({ required_error: 'password is required' }).min(6, 'Password too short - should be more than 6 characters'),
        passwordConfirmation: string({ required_error: 'passwordConfirmation is required' }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation']
    })
})


export const loginSchema = object({
    body: object({
        email: string({ required_error: 'email is required' }),
        password: string({ required_error: 'password is required' })
    })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirmation'>
export type LoginUserInput = TypeOf<typeof loginSchema>