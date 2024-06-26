## Withdraw funds
To withdraw funds from account

**URL**: `/api/v1/accounts/withdraw`

**Method**: `POST`

**Authentication**: Required

## Request body

**Required fields:** `amount`, `accountId`, `bankAccountNumber`, `bank`

**Optional fields:** 

**Data**:
```bash
{ 
    "amount": 100, 
    "accountId": 4,
    "bankAccountNumber": "1234567890",
    "bank": "test bank"
}
```

## Success response
**Code**: `200 OK`

**Content**:
```bash
{
    "status": "success",
    "message": "withdraw successful",
    "data": {
        "account": {
            "id": 4,
            "balance": "5570.00"
        }
    }
}
```

## Error response
**Condition**: If `amount` is greater than account balance

**Code**: `400 Bad Request`

**Content**:
```bash
{ 
    "status": "error", 
    "message": "Insufficient Balance", 
    "data": null
}
```

**Condition**: If `amount` to be withdrawn is non-positive

**Code**: `400 Bad Request`

**Content**:
```bash
[
    {
    "code": "too_small",
    "minimum": 0,
    "type": "number",
    "inclusive": false,
    "exact": false,
    "message": "amount to be deposited cannot be negative",
    "path": [ 'body', 'amount' ]
    }
]
```

**Condition**: If account does not belong to the current user

**Code**: `400 Bad Request`

**Content**:
```bash
{
    "status": "error",
    "message": "Account does not belong to sender",
    "data": null
}
```

**Condition**: If user is not logged in

**Code**: `401 Unauthorized`

**Content**:
```bash
{
    "status": "error",
    "message": "You do not have the access token",
    "data": null
}
```

**Condition**: If user is sending a bad token

**Code**: `401 Unauthorized`

**Content**:
```bash
{
    "status": "error",
    "message": "You are sending a bad token",
    "data": null
}
```