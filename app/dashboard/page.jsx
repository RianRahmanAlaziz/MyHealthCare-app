'use client';
import { useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'
import { STEP_ROUTE_MAP } from "@/lib/stepRouteMap";
import { BookText, CircleUser, CircleUserRound, Library, SquareUser } from "lucide-react";
import useDashboard from '@/components/cms/hooks/master-data/useDashboard';
import { DashboardCardSkeleton } from '@/components/cms/common/DashboardCardSkeleton';

export default function DashboardIndexPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Dashboard | HealthCare Research";

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

        const checkAccess = async () => {
            try {
                const res = await axiosInstance.get("/auth/me");

                const roles = res.data.user.roles || [];

                if (!["Perawat", "Admin"].some(r => roles.includes(r))) {
                    toast.error("Anda tidak memiliki akses");
                    router.replace("/");
                }

            } catch (err) {
                // 3️⃣ TOKEN INVALID / EXPIRED
                localStorage.clear();
                toast.error("Sesi Anda telah berakhir");
                router.replace("/auth/login");
            }
        };

        checkAccess();

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

    const {
        totalUsers,
        totalpasient,
        totalperawat,
        totalmodul,
        totalintervetion,
        loading,
    } = useDashboard();

    return (
        <>
            <div className="col-span-12 mt-24">
                <div className="intro-y flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                        HealthCare Research
                    </h2>
                </div>
                <div className="grid grid-cols-12 gap-6 mt-5">

                    {loading ? (
                        <>
                            <DashboardCardSkeleton />
                            <DashboardCardSkeleton />
                            <DashboardCardSkeleton />
                        </>
                    ) : (
                        <>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <SquareUser className="report-box__icon text-primary" />
                                        </div>

                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {totalUsers.toLocaleString("id-ID")}
                                        </div>

                                        <div className="text-base text-slate-500 mt-1">
                                            Users
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <CircleUserRound className="report-box__icon text-primary" />
                                        </div>

                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {totalpasient.toLocaleString("id-ID")}
                                        </div>

                                        <div className="text-base text-slate-500 mt-1">
                                            Pasien
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <CircleUser className="report-box__icon text-primary" />
                                        </div>

                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {totalperawat.toLocaleString("id-ID")}
                                        </div>

                                        <div className="text-base text-slate-500 mt-1">
                                            Perawat
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <BookText className="report-box__icon text-primary" />
                                        </div>
                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {totalmodul.toLocaleString("id-ID")}
                                        </div>
                                        <div className="text-base text-slate-500 mt-1">
                                            E-Modul
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                                <div className="report-box zoom-in">
                                    <div className="box p-5">
                                        <div className="flex">
                                            <Library className="report-box__icon text-primary" />
                                        </div>

                                        <div className="text-3xl font-medium leading-8 mt-6">
                                            {totalintervetion.toLocaleString("id-ID")}
                                        </div>

                                        <div className="text-base text-slate-500 mt-1">
                                            Intervention
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
}
