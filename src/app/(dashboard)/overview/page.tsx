'use client';

import { useDashboard } from '@/hooks/use-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function OverviewPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      title: 'Total Users',
      value: data?.totalUsers || 0,
      icon: Users,
      description: `${data?.activeUsers || 0} active`,
    },
    {
      title: 'Total Deposits',
      value: formatCurrency(data?.totalDeposits || 0),
      icon: ArrowDownToLine,
      description: 'All time',
    },
    {
      title: 'Total Withdrawals',
      value: formatCurrency(data?.totalWithdrawals || 0),
      icon: ArrowUpFromLine,
      description: 'All time',
    },
    {
      title: 'Total Transfers',
      value: formatCurrency(data?.totalTransfers || 0),
      icon: ArrowLeftRight,
      description: 'All time',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Deposits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentDeposits?.map((deposit: any) => (
                <div key={deposit.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {deposit.user.firstName} {deposit.user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      +{formatCurrency(deposit.amount)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      deposit.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      deposit.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {deposit.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Withdrawals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentWithdrawals?.map((withdrawal: any) => (
                <div key={withdrawal.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      {withdrawal.user.firstName} {withdrawal.user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(withdrawal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">
                      -{formatCurrency(withdrawal.amount)}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      withdrawal.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      withdrawal.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {withdrawal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}