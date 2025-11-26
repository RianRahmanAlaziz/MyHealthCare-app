'use client'
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, Phone, User } from 'lucide-react';

export default function Registration({ onNavigateToLogin }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            onNavigateToLogin();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-md">

                {/* Back Button */}
                <button
                    onClick={onNavigateToLogin}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali
                </button>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-teal-500' : 'bg-gray-200'}`} />
                    <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-teal-500' : 'bg-gray-200'}`} />
                </div>

                <motion.div

                    className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-gray-900 mb-2 text-center">
                        {step === 1 ? 'Buat Akun Baru' : 'Buat Kata Sandi'}
                    </h2>

                    <p className="text-gray-600 text-center mb-6">
                        {step === 1 ? 'Masukkan informasi dasar Anda' : 'Amankan akun Anda dengan kata sandi'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {step === 1 ? (
                            <>
                                {/* Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700">Nama Lengkap</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Nama Anda"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-700">Nomor Telepon</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+62 812-3456-7890"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                            required
                                        />
                                    </div>
                                </div>

                            </>
                        ) : (
                            <>
                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700">Kata Sandi</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Minimal 8 karakter"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-gray-700">Konfirmasi Kata Sandi</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Ketik ulang kata sandi"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-blue-800 text-sm">
                                        ✓ Minimal 8 karakter<br />
                                        ✓ Kombinasi huruf dan angka<br />
                                        ✓ Simpan dengan aman
                                    </p>
                                </div>
                            </>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg cursor-pointer"
                        >
                            {step === 1 ? 'Lanjutkan' : 'Daftar'}
                        </Button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}
