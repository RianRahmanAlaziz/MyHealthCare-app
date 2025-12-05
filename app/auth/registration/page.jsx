'use client'
import Registration from '@/components/auth/Registration'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS

export default function RegistrationPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Registration | HealthCare Research";

    }, [router]);
    const onNavigateToLogin = () => {
        router.push("/auth/login");
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            <Registration onNavigateToLogin={onNavigateToLogin} />
        </div>

    )
}
