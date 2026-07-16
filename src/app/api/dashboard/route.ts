import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalUsers,
      activeUsers,
      totalDeposits,
      totalWithdrawals,
      totalTransfers,
      recentDeposits,
      recentWithdrawals,
      recentTransfers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.deposit.aggregate({
        _sum: { amount: true },
        where: { status: 'APPROVED' },
      }),
      prisma.withdrawal.aggregate({
        _sum: { amount: true },
        where: { status: 'APPROVED' },
      }),
      prisma.transfer.aggregate({
        _sum: { amount: true },
      }),
      prisma.deposit.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { firstName: true, lastName: true, email: true },
          },
        },
      }),
      prisma.withdrawal.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { firstName: true, lastName: true, email: true },
          },
        },
      }),
      prisma.transfer.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          fromUser: {
            select: { firstName: true, lastName: true },
          },
          toUser: {
            select: { firstName: true, lastName: true },
          },
        },
      }),
    ]);

    const dashboardData = {
      totalUsers,
      activeUsers,
      totalDeposits: totalDeposits._sum.amount || 0,
      totalWithdrawals: totalWithdrawals._sum.amount || 0,
      totalTransfers: totalTransfers._sum.amount || 0,
      recentDeposits,
      recentWithdrawals,
      recentTransfers,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}