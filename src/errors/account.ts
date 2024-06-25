
export class InsufficientBalanceError extends Error {
    constructor() {
        super('Insufficient Balance')
    }
}

export class AccountNotFoundError extends Error {
    constructor() {
        super('No account with this account id')
    }
}

export class ForbiddenError extends Error {
    constructor() {
        super('Account does not belong to sender')
    }
}