'use client'

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, Phone, User, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify'
import axiosInstance from '@/lib/axiosInstance';

export default function Registration({ onNavigateToLogin }) {
    const [step, setStep] = useState(1);
    const [checkingPhone, setCheckingPhone] = useState(false);
    const [phoneExists, setPhoneExists] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const isPasswordMatch =
        formData.confirmPassword.length > 0 &&
        formData.password === formData.confirmPassword;

    const checkPhone = async (phone) => {
        if (phone.length < 8) {
            setPhoneExists(false);
            return;
        }

        try {
            setCheckingPhone(true);
            const res = await axiosInstance.post("/auth/check-phone", { phone });
            setPhoneExists(res.data.exists);
        } catch {
            setPhoneExists(false);
        } finally {
            setCheckingPhone(false);
        }
    };

    const debounceTimer = useRef(null);

    const debouncedCheckPhone = (phone) => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            checkPhone(phone);
        }, 600);
    };



    const handleRegister = async () => {
        if (loading) return;
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Password dan konfirmasi tidak sama");
            return;
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post("/auth/register", {
                name: formData.name,
                phone: formData.phone,
                password: formData.password,
            });


            // Jika sukses → redirect ke login
            toast.success('Registrasi berhasil!');
            onNavigateToLogin();
        } catch (err) {
            const res = err.response;

            // Error validasi dari Laravel (422)
            if (res?.status === 422 && res.data?.errors) {
                const firstError = Object.values(res.data.errors)[0][0];
                toast.error(firstError);
                setLoading(false);
                return;
            }
            // Error custom dari Laravel
            if (res?.data?.message) {
                toast.error(res.data.message);
                setLoading(false);
                return;
            }
            toast.error('Terjadi kesalahan pada server');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;

        if (step === 1) {
            setStep(2);
        } else {
            handleRegister();
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
                    disabled={loading}
                    onClick={onNavigateToLogin}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali
                </button>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {/* Step 1 */}
                    <button
                        disabled={loading}
                        onClick={() => setStep(1)}
                        className={`cursor-pointer h-2 w-16 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-teal-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                    />

                    {/* Step 2 */}
                    <button
                        disabled={loading}
                        onClick={() => setStep(2)}
                        className={`cursor-pointer h-2 w-16 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-teal-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                    />
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
                                            name="name"
                                            disabled={loading}
                                            type="text"
                                            placeholder="Nama Anda"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                            required
                                            autoFocus
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
                                            name="phone"
                                            disabled={loading}
                                            type="tel"
                                            placeholder="0812-3456-7890"
                                            value={formData.phone}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFormData({ ...formData, phone: value });
                                                debouncedCheckPhone(value);
                                            }}
                                            className={`pl-12 h-12 rounded-xl transition-all ${phoneExists ? "border-red-500 focus:ring-red-400" : "border-gray-200 focus:ring-teal-400"}`}
                                            required
                                        />
                                        {checkingPhone && (
                                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Mengecek nomor...
                                            </p>
                                        )}

                                        {!checkingPhone && formData.phone.length >= 8 && (
                                            phoneExists ? (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-sm text-red-600 mt-1"
                                                >
                                                    ✗ Nomor sudah terdaftar
                                                </motion.p>
                                            ) : (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-sm text-green-600 mt-1"
                                                >
                                                    ✓ Nomor tersedia
                                                </motion.p>
                                            )
                                        )}

                                    </div>
                                </div>


                            </>
                        ) : (
                            <>
                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700">Kata Sandi</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 " />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Minimal 8 karakter"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                            required
                                            autoFocus
                                            minLength={8}
                                            autoComplete="current-password"
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-gray-700">Konfirmasi Kata Sandi</Label>
                                    <div className="relative">
                                        <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 
                                             ${formData.confirmPassword.length === 0
                                                ? "text-gray-400"
                                                : isPasswordMatch
                                                    ? "text-gray-400"
                                                    : "text-red-400"}
                                                        `} />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Ketik ulang kata sandi"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className={`
                                                    pl-12 h-12 rounded-xl 
                                                    border 
                                                    transition-all
                                                    ${formData.confirmPassword.length === 0
                                                    ? "border-gray-200 focus:ring-2 focus:ring-teal-400"
                                                    : isPasswordMatch
                                                        ? "border-gray-200 focus:ring-2 focus:ring-teal-400"
                                                        : "border-red-500 focus:ring-2 focus:ring-red-400"}
                                                    `}
                                            required
                                            autoComplete="current-password"
                                        />

                                    </div>
                                </div>
                                {/* Realtime Indicator */}
                                {formData.confirmPassword.length > 0 && (
                                    <motion.p
                                        key={isPasswordMatch ? "match" : "not-match"} // penting agar animasi re-run
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            x: isPasswordMatch ? 0 : [0, -6, 6, -4, 4, -2, 2, 0], // shake effect
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                        className={`text-sm mt-1 
            ${isPasswordMatch ? "text-green-600" : "text-red-600"}
        `}
                                    >
                                        {isPasswordMatch ? "✓ Password cocok" : "✗ Password tidak sama"}
                                    </motion.p>
                                )}

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
                            disabled={loading || phoneExists || checkingPhone}
                            className="w-full h-12 bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                step === 1 ? 'Lanjutkan' : 'Daftar'
                            )}
                        </Button>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}
