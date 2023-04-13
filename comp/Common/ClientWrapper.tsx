"use client";

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';

interface Props {
  children?: ReactNode
}

const queryClient = new QueryClient()

function ClientWrapper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>

      <ToastContainer limit={2} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default ClientWrapper