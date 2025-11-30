"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import { Onboarding } from '../components/Onboarding';

export default function home() {
  const router = useRouter();

  const onComplete = () => {
    router.push("/informed-consent");
  };

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
      <Onboarding onComplete={onComplete} />
    </div>
  )
}
