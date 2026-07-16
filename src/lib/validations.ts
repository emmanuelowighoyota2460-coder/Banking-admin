import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'BANNED']).optional(),
});

export const depositSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  method: z.string().min(1, 'Method is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  currency: z.string().default('USD'),
});

export const withdrawalSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  method: z.string().min(1, 'Method is required'),
  accountInfo: z.string().min(1, 'Account info is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  currency: z.string().default('USD'),
});

export const transferSchema = z.object({
  fromUserId: z.string().min(1, 'Sender ID is required'),
  toUserId: z.string().min(1, 'Recipient ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  description: z.string().optional(),
  currency: z.string().default('USD'),
});

export const investmentPlanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  minAmount: z.number().min(0, 'Min amount must be positive'),
  maxAmount: z.number().min(0, 'Max amount must be positive'),
  roi: z.number().min(0, 'ROI must be positive'),
  duration: z.number().min(1, 'Duration must be at least 1 day'),
});

export const investmentSubscriptionSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  planId: z.string().min(1, 'Plan ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
});

export const cardSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  cardNumber: z.string().min(16, 'Card number must be at least 16 digits'),
  cardHolder: z.string().min(1, 'Card holder name is required'),
  expiryDate: z.string().min(5, 'Expiry date is required'),
  cvv: z.string().min(3, 'CVV is required'),
  cardType: z.string().min(1, 'Card type is required'),
  creditLimit: z.number().min(0).default(0),
});

export const loanSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  interestRate: z.number().min(0, 'Interest rate must be positive'),
  term: z.number().min(1, 'Term must be at least 1 month'),
  purpose: z.string().min(1, 'Purpose is required'),
});

export const settingsSchema = z.record(z.string(), z.string());

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type DepositInput = z.infer<typeof depositSchema>;
export type WithdrawalInput = z.infer<typeof withdrawalSchema>;
export type TransferInput = z.infer<typeof transferSchema>;
export type InvestmentPlanInput = z.infer<typeof investmentPlanSchema>;
export type InvestmentSubscriptionInput = z.infer<typeof investmentSubscriptionSchema>;
export type CardInput = z.infer<typeof cardSchema>;
export type LoanInput = z.infer<typeof loanSchema>;