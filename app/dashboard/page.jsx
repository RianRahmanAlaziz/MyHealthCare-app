'use client';
import { useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'
import { STEP_ROUTE_MAP } from "@/lib/stepRouteMap";

export default function DashboardIndexPage() {
    const router = useRouter();


    useEffect(() => {
        document.title = "Dashboard | HealthCare Research";


        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

        if (!["Perawat", "Admin"].some(r => user.roles?.includes(r))) {
            toast.error("Anda tidak memiliki akses ke halaman ini");
            const lastStep = user?.last_step;
            if (lastStep && STEP_ROUTE_MAP[lastStep]) {
                router.replace(STEP_ROUTE_MAP[lastStep]);
            } else {
                router.replace("/");
            }
            return;
        }

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
    }, [router]);
    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-8 sm:pt-24">
                HealthCare Research
            </h2>
        </>
    );
}
