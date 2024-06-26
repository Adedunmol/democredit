## Fund account
To fund an account

**URL**: `/api/v1/accounts/fund`

**Method**: `POST`

**Authentication**: Required

## Request body

**Required fields:** `amount`, `accountId`

**Optional fields:** 

**Data**:
```bash
{ 
    "amount": 100, 
    "accountId": 2
}
```

## Success response
**Code**: `200 OK`

**Content**:
```bash
{
    "status": "success",
    "message": "account funded successfully",
    "data": {
        "account": {
            "id": 4,
            "balance": "6060.00"
        }
    }
}
```

## Error response
**Condition**: If `amount` to be funded is non-positive

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