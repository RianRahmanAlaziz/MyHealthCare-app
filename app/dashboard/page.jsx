'use client';
import { useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from "next/navigation";

export default function DashboardIndexPage() {
    const router = useRouter();

    useEffect(() => {
        document.title = "Dashboard | HealthCare Research";

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;


            await axiosInstance.post("/auth/update-last-step", {
                last_step: "dashboard"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "dashboard";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();
    }, []);
    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-8 sm:pt-24">
                HealthCare Research
            </h2>
        </>
    );
}
