"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import { Onboarding } from '../components/Onboarding';

export default function home() {
  const router = useRouter();

  const onComplete = () => {
    router.push("/auth/login");
  };

  return (
    <Onboarding onComplete={onComplete} />
  )
}
