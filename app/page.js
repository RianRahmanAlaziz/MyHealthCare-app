"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Login from '@/components/auth/Login'

export default function home() {
  const router = useRouter();

  const onNavigateToRegistration = () => {
    router.push("/auth/registration");
  };
  const onNavigateToConsent = () => {
    router.push("/auth/research-consent");
  };

  return (
    <Login onNavigateToRegistration={onNavigateToRegistration} onNavigateToConsent={onNavigateToConsent} />
  )
}
