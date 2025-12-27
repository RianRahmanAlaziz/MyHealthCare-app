'use client';

import "@/style/css/app.css"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import "tom-select/dist/css/tom-select.css";
import { toast } from 'react-toastify';
import Topbar from "@/components/cms/layouts/Topbar";
import Sidebar from "@/components/cms/layouts/Sidebar";
import Switcher from "@/components/cms/layouts/Switcher";
import Menumobile from "@/components/cms/layouts/Menumobile";
import axiosInstance from "@/lib/axiosInstance";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        // ✅ Fungsi untuk refresh token
        const refreshToken = async () => {
            try {
                const res = await axiosInstance.post("/auth/refresh");

                const data = res.data;

                localStorage.setItem("token", data.access_token);

                toast.success("Token berhasil diperbarui 🔄");
            } catch (error) {
                console.error("Error refresh token:", error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                toast.error("Sesi habis, silakan login ulang.");
                window.location.href = "/auth/login";
            }
        };

        // ✅ Cek token saat halaman dibuka
        const checkAuth = async () => {
            try {
                await axiosInstance.get("/auth/me");
                // jika sukses → user masih login
            } catch (error) {
                // token invalid / expired → coba refresh
                await refreshToken();
            }
        };

        checkAuth();

        // Auto refresh token setiap 55 menit (3300 detik)
        const interval = setInterval(() => {
            refreshToken();
        }, 50 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
        } catch (error) {
            console.warn("Logout error:", error);
        } finally {
            // 🧹 bersihkan auth
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // ✅ client-side navigation
            window.location.href = "/auth/login";
        }
    };

    return (
        <>
            {/* Layout khusus dashboard */}
            <div className="min-h-screen py-5 md:py-5 md:pr-5">
                <Menumobile />
                <Topbar handleLogout={handleLogout} />
                <div className="flex overflow-hidden">
                    <Sidebar />
                    <div className="content">
                        {children}
                    </div>
                </div>
                <Switcher />
            </div>

            <div id="modal-root" />
        </>
    );
}
