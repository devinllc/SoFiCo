# SoFiCo API Documentation

## Base URL
```
https://so-fi-co.vercel.app/
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Responses
All endpoints may return the following error responses:
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "password": "string",
  "role": "USER" // optional, defaults to "USER"
}
```
Response: `201 Created`
```json
{
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "role": "string",
    "createdAt": "string"
  },
  "token": "string",
  "refreshToken": "string"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```
Response: `200 OK`
```json
{
  "user": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "role": "string"
  },
  "token": "string",
  "refreshToken": "string"
}
```

### Refresh Token
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "string"
}
```
Response: `200 OK`
```json
{
  "token": "string",
  "refreshToken": "string"
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "role": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Disable Account
```http
POST /auth/disable
Authorization: Bearer <token>
```
Response: `200 OK`

## Wallet Endpoints

### Get Balance
```http
GET /wallet/balance
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "balance": "number",
  "currency": "string",
  "lastUpdated": "string"
}
```

### Get Pending Withdrawals (Admin Only)
```http
GET /wallet/pending-withdrawals
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "withdrawals": [
    {
      "id": "string",
      "userId": "string",
      "amount": "number",
      "status": "string",
      "createdAt": "string"
    }
  ]
}
```

## Loan Endpoints

### Apply for Loan
```http
POST /loan/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": "number",
  "purpose": "string",
  "duration": "number", // in months
  "collateral": "string" // optional
}
```
Response: `201 Created`
```json
{
  "id": "string",
  "amount": "number",
  "status": "string",
  "createdAt": "string"
}
```

### Get All Loans (Admin/Agent Only)
```http
GET /loan
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "loans": [
    {
      "id": "string",
      "userId": "string",
      "amount": "number",
      "status": "string",
      "createdAt": "string",
      "approvedAt": "string",
      "approvedBy": "string"
    }
  ]
}
```

### Approve Loan (Admin/Agent Only)
```http
POST /loan/:loanId/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "approved": "boolean",
  "notes": "string" // optional
}
```
Response: `200 OK`

### Update Loan Status (Admin/Agent Only)
```http
PUT /loan/:loanId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "string", // "APPROVED", "REJECTED", "PAID", "DEFAULTED"
  "notes": "string" // optional
}
```
Response: `200 OK`

## Scheme Endpoints

### Create Scheme
```http
POST /scheme
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "targetAmount": "number",
  "duration": "number", // in months
  "contributionAmount": "number",
  "contributionFrequency": "string" // "WEEKLY", "MONTHLY"
}
```
Response: `201 Created`
```json
{
  "id": "string",
  "name": "string",
  "status": "string",
  "createdAt": "string"
}
```

### Get User Schemes
```http
GET /scheme/my-schemes
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "schemes": [
    {
      "id": "string",
      "name": "string",
      "status": "string",
      "targetAmount": "number",
      "currentAmount": "number",
      "createdAt": "string"
    }
  ]
}
```

### Get Scheme Details
```http
GET /scheme/:schemeId
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "status": "string",
  "targetAmount": "number",
  "currentAmount": "number",
  "duration": "number",
  "contributionAmount": "number",
  "contributionFrequency": "string",
  "createdAt": "string",
  "members": [
    {
      "userId": "string",
      "name": "string",
      "contributionAmount": "number",
      "joinedAt": "string"
    }
  ]
}
```

### Dissolve Scheme
```http
POST /scheme/:schemeId/dissolve
Authorization: Bearer <token>
```
Response: `200 OK`

### Get All Schemes (Admin Only)
```http
GET /scheme
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "schemes": [
    {
      "id": "string",
      "name": "string",
      "status": "string",
      "targetAmount": "number",
      "currentAmount": "number",
      "createdAt": "string",
      "createdBy": "string"
    }
  ]
}
```

### Approve Scheme (Admin Only)
```http
POST /scheme/:schemeId/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "approved": "boolean",
  "notes": "string" // optional
}
```
Response: `200 OK`

## Agent Endpoints

### Register Agent (Admin Only)
```http
POST /agent/register
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "password": "string"
}
```
Response: `201 Created`
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "role": "AGENT",
  "createdAt": "string"
}
```

### Get Agent Profile
```http
GET /agent/profile
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "performanceScore": "number",
  "createdAt": "string"
}
```

### Get Assigned Loans
```http
GET /agent/loans
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "loans": [
    {
      "id": "string",
      "userId": "string",
      "amount": "number",
      "status": "string",
      "createdAt": "string"
    }
  ]
}
```

### Get Created Users
```http
GET /agent/users
Authorization: Bearer <token>
```
Response: `200 OK`
```json
{
  "users": [
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "createdAt": "string"
    }
  ]
}
```

### Create User (Agent Only)
```http
POST /agent/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "password": "string"
}
```
Response: `201 Created`
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string",
  "createdAt": "string"
}
```

### Update Performance Score (Admin Only)
```http
POST /agent/:agentId/performance
Authorization: Bearer <token>
Content-Type: application/json

{
  "score": "number",
  "notes": "string" // optional
}
```
Response: `200 OK`

## Data Types

### User Roles
- `USER` - Regular user
- `AGENT` - Loan agent
- `ADMIN` - System administrator

### Loan Status
- `PENDING` - Loan application submitted
- `APPROVED` - Loan approved
- `REJECTED` - Loan rejected
- `PAID` - Loan fully paid
- `DEFAULTED` - Loan defaulted

### Scheme Status
- `PENDING` - Scheme pending approval
- `ACTIVE` - Scheme active
- `COMPLETED` - Scheme completed
- `DISSOLVED` - Scheme dissolved
- `REJECTED` - Scheme rejected

### Contribution Frequency
- `WEEKLY` - Weekly contributions
- `MONTHLY` - Monthly contributions 