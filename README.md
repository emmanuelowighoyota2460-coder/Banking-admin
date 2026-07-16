# Banking Admin Dashboard

A complete, production-ready Banking Admin Dashboard system built with Next.js, Prisma, and TypeScript.

## Features

- ✅ Full authentication system with JWT access and refresh tokens
- ✅ Complete Prisma schema with all required models and relations
- ✅ All API routes with proper validation and error handling
- ✅ React Query hooks for data fetching and mutations
- ✅ Responsive dashboard UI with sidebar navigation
- ✅ Form validation using Zod and React Hook Form
- ✅ Security features including bcrypt password hashing and role-based access
- ✅ Seed script with default admin user and settings

## Project Structure

```
banking-admin/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.ts
│   │   │   │   ├── refresh/route.ts
│   │   │   │   └── logout/route.ts
│   │   │   ├── users/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   └── dashboard/route.ts
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   └── overview/page.tsx
│   │   └── login/page.tsx
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── sidebar.tsx
│   │   └── header.tsx
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-users.ts
│   │   └── use-dashboard.ts
│   └── lib/
│       ├── prisma.ts
│       ├── auth.ts
│       ├── api-client.ts
│       ├── validations.ts
│       └── utils.ts
└── middleware.ts
```

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Setup database

```bash
npx prisma generate
npx prisma db push
```

### 3. Seed the database

```bash
npx tsx prisma/seed.ts
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/banking_admin?schema=public"
ACCESS_TOKEN_SECRET="your-access-token-secret-key-change-in-production"
REFRESH_TOKEN_SECRET="your-refresh-token-secret-key-change-in-production"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Default Admin Credentials

- **Email**: admin@banking.com
- **Password**: admin123

## Database Schema

The system includes comprehensive models for:

- **Users**: Admin and regular users with roles and status management
- **Deposits**: User deposit transactions with status tracking
- **Withdrawals**: User withdrawal requests with approval workflow
- **Transfers**: Inter-user money transfers
- **Investment Plans**: Predefined investment plans with ROI and duration
- **Investment Subscriptions**: User investments in plans
- **Cards**: Credit/debit cards associated with users
- **Loans**: Loan applications and management
- **Settings**: System-wide configuration
- **Refresh Tokens**: Token management for authentication

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users with pagination and filters
- `POST /api/users` - Create a new user
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## Technologies Used

- **Next.js 14**: React framework with built-in optimizations
- **Prisma ORM**: Database management and migrations
- **PostgreSQL**: Production-grade database
- **JWT**: Token-based authentication
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Efficient form state management
- **React Query**: Server state management
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components

## Security Features

- ✅ Bcrypt password hashing
- ✅ JWT token-based authentication
- ✅ HTTP-only secure cookies
- ✅ Role-based access control (RBAC)
- ✅ Request validation with Zod
- ✅ SQL injection prevention via Prisma
- ✅ CSRF protection via secure cookies

## License

MIT
