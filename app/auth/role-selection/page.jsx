'use client'
import { useState, useEffect } from 'react';
import { Stethoscope, User, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import axiosInstance from '@/lib/axiosInstance';

export default function RoleSelectionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

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
        if (loading) return;

        setLoading(true);
        setSelectedRole(roles);

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error('Silakan login ulang');
                router.push('/auth/login');
                return;
            }

            const res = await axiosInstance.post("/auth/update-role", {
                roles,
            });

            const data = res.data;

            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success('Role berhasil dipilih');

            // ✅ Redirect sesuai role
            setTimeout(() => {
                if (roles === 'Perawat') router.push('/nurse/consent-screen');
                if (roles === 'Pasient') router.push('/patient/consent-screen');
            }, 800);

        } catch (err) {
            console.error(err);
            toast.error('Terjadi kesalahan server');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            {loading && (
                <div className="fixed inset-0 bg-white/70 backdrop-blur flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 animate-spin text-teal-600" />
                        <p className="text-gray-700 text-sm">
                            Memproses {selectedRole}...
                        </p>
                    </div>
                </div>
            )}
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
                            disabled={loading}
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
                            disabled={loading}
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
                </div>
            </div>
        </div>
    );
}
