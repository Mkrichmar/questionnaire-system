"use client"
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return <div>{children}</div>
}
