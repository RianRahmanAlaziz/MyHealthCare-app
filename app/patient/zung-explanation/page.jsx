"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ZungExplanation from '@/components/patient/ZungExplanation'
import axiosInstance from '@/lib/axiosInstance';

export default function ZungExplanationPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Skala Kecemasan Zung | HealthCare Research";

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axiosInstance.post("/auth/update-last-step", {
                last_step: "zung-explanation"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "zung-explanation";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();
    }, []);
    const onNavigateToZungScale = () => {
        router.push("/patient/zung-scale");
    };
    return (
        <ZungExplanation onNavigateToZungScale={onNavigateToZungScale} />
    )
}
