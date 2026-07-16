'use client';

import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

interface LoginData {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => apiClient.post('/auth/login', data),
    onSuccess: (response) => {
      setUser(response.data.user);
      queryClient.invalidateQueries();
      router.push('/overview');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiClient.post('/auth/logout'),
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
      router.push('/login');
    },
  });

  return {
    user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error || logoutMutation.error,
  };
}