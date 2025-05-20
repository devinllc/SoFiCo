# Loan Application Backend

A robust backend service for managing loan applications, built with Node.js, Express, and MongoDB, following Clean Architecture principles.

## Features

- Authentication and Authorization
- Admin Management
- Agent Management
- Role-based Access Control
- Multi-factor Authentication
- Activity Logging
- API Documentation

## Prerequisites

- Node.js >= 16.0.0
- MongoDB
- Vercel CLI (for deployment)

## Environment Variables

Create a `.env` file in the root directory with the following variables (see `.env.example` for reference):

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=your_cors_origin
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Lint code:
   ```bash
   npm run lint
   ```

## Deployment to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Set up environment variables in Vercel:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add JWT_REFRESH_SECRET
   vercel env add CORS_ORIGIN
   ```

4. Deploy to Vercel:
   ```bash
   vercel
   ```

   For production deployment:
   ```bash
   vercel --prod
   ```

## Project Structure

```
server/
├── src/
│   ├── services/           # Microservices
│   │   ├── auth/          # Authentication Service
│   │   ├── admin/         # Admin Service
│   │   └── agent/         # Agent Service
│   ├── middleware/        # Express middleware
│   ├── utils/            # Utility functions
│   └── index.js          # Application entry point
├── tests/                # Test files
└── config/              # Configuration files
```

## API Documentation

### Authentication Service

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - User logout

### Admin Service

- `POST /api/admin` - Create admin (super_admin only)
- `GET /api/admin` - Get admin profile
- `PUT /api/admin` - Update admin profile
- `DELETE /api/admin/:userId` - Delete admin (super_admin only)

### Agent Service

- `POST /api/agent` - Create agent
- `GET /api/agent` - Get agent profile
- `PUT /api/agent` - Update agent profile
- `DELETE /api/agent/:userId` - Delete agent

## Security

- JWT-based authentication
- Role-based access control
- Two-factor authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- Error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 