## Register
To register a new user

**URL**: `/api/v1/auth/register/`

**Method**: `POST`

**Authentication**: Not required

## Request body
**Required fields:** `email`, `username`, `password`, `passwordConfirmation`

**Optional fields:**

**Data**:
```bash
{
    "email": "test@gmail.com",
    "username": "test_username",
    "password": "password123",
    "passwordConfirmation": "password123",
}
```

## Success response
**Code**: `200 OK`

**Content**:
```bash
{
    "data": {
        "userId": 10,
        "accountId": 5
    },
    "message": "",
    "status": "success"
}
```

## Error responses
**Condition**: If the `email` is already registered.

**Code**: `409 Conflict`

**Content**:
```bash
{
    "status": "error",
    "message": "duplicate value entered",
    "data": null
}

```
**Condition**: If all required values are not sent.

**Code**: `400 Bad Request`

**Content**:
```bash
[
    {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": [
            "body",
            "passwordConfirmation"
        ],
        "message": "passwordConfirmation is required"
    }
]
```

**Condition**: If user's `email` is on karma blacklist.

**Code**: `400 Bad Request`

**Content**:
```bash
{
    "status": "error",
    "message": "this user has been blacklisted",
    "data": null
}
```