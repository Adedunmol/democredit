## Login
To login a user and get access token

**URL**: `/api/v1/auth/login`

**Method**: `POST`

**Authentication**: Not required

## Request body
**Required fields:** `email`, `password`

**Optional fields:** 

**Data**:
```bash
{
    "email": "t@gmail.com",
    "password": "password123"
}
```

## Success response
**Code**: `200 OK`

**Content**:
```bash
{
    status: "success",
    message: "",
    data: {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR...TL54pO2vJkQ21J6kzQ",
        "expiresIn": 90000
    }
}
```

## Error response
**Condition**: If any of the required fields is absent.

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
            "password"
        ],
        "message": "password is required"
    }
]
```

**Condition**: If email or password is wrong.

**Code**: `401 Unauthorized`

**Content**:
```bash
{
    "status": "error",
    "message": "Invalid credentials",
    "data": null
}
```