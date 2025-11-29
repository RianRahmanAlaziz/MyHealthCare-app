'use client'
import { useState } from 'react';
import { Stethoscope, User, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RoleSelectionPage() {
    const router = useRouter();

    const onSelectRole = (role) => {
        if (role === 'nurse') router.push('/nurse/consent-screen');
        if (role === 'patient') router.push('/patient/consent-screen');
        if (role === 'admin') router.push('/admin/login');
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
                            onClick={() => onSelectRole('nurse')}
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
                            onClick={() => onSelectRole('patient')}
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
