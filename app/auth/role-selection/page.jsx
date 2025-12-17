'use client'
import { useState, useEffect } from 'react';
import { Stethoscope, User, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS

export default function RoleSelectionPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Role Selection | HealthCare Research";
        const user = JSON.parse(localStorage.getItem("user"));

        // ❌ Belum login
        if (!user) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

    }, [router]);

    const onSelectRole = async (roles) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Silakan login ulang');
                router.push('/auth/login');
                return;
            }

            const res = await fetch('http://127.0.0.1:8000/api/auth/update-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ roles })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || 'Gagal mengubah role');
                return;
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success('Role berhasil dipilih');

            // ✅ Redirect sesuai role
            setTimeout(() => {
                if (roles === 'Perawat') router.push('/nurse/consent-screen');
                if (roles === 'Pasient') router.push('/patient/consent-screen');
                if (roles === 'Admin') router.push('/dashboard');
            }, 800);

        } catch (err) {
            console.error(err);
            toast.error('Terjadi kesalahan server');
        }
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-2xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-teal-700 mb-3">Selamat Datang!</h1>
                        <h2 className="text-gray-800 mb-2">Apakah Anda...</h2>
                        <p className="text-gray-600">Pilih peran Anda untuk melanjutkan</p>
                    </div>

                    {/* Role Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Nurse Card */}
                        <button
                            onClick={() => onSelectRole('Perawat')}
                            className="group bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <Stethoscope className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-gray-900 mb-3">Saya Perawat</h3>
                                <p className="text-gray-600 mb-6">
                                    Sebagai tenaga kesehatan yang memberikan perawatan dan dukungan kepada pasien hemodialisis
                                </p>
                                <div className="w-full h-1 bg-linear-to-r from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>

                        {/* Patient Card */}
                        <button
                            onClick={() => onSelectRole('Pasient')}
                            className="group bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    <User className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-gray-900 mb-3">Saya Pasien</h3>
                                <p className="text-gray-600 mb-6">
                                    Sebagai pasien yang menjalani terapi hemodialisis rutin dan ingin berpartisipasi dalam penelitian
                                </p>
                                <div className="w-full h-1 bg-linear-to-r from-teal-400 to-teal-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    </div>

                    {/* Admin Access */}
                    <div className="text-center">
                        <button
                            // onClick={() => onSelectRole('admin')}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors text-sm cursor-pointer"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Akses Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
