'use client'
import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartPulse, Lock, Phone } from 'lucide-react';

export default function Login({ onNavigateToRegistration, handleLogin }) {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');



    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
                        <HeartPulse className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-teal-700 mb-2">HealthCare Research</h1>
                    <p className="text-gray-600">Platform Penelitian Hemodialisis</p>
                </div>
                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-gray-900 mb-6 text-center">Masuk ke Akun Anda</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin(identifier, password);
                        }}
                        className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="identifier" className="text-gray-700">Nomor Telepon</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    placeholder="+62 812-3456-7890"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                    required
                                    autoFocus
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">Kata Sandi</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12 h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                    required
                                />

                            </div>
                        </div>

                        <button
                            type="button"
                            className="text-teal-600 hover:text-teal-700 transition-colors text-sm cursor-pointer"
                        >
                            Lupa kata sandi?
                        </button>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg cursor-pointer"
                        >
                            Masuk
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Belum punya akun?{' '}
                            <button
                                onClick={onNavigateToRegistration}
                                className="text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
                            >
                                Daftar di sini
                            </button>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Dengan masuk, Anda menyetujui syarat dan ketentuan penelitian
                </p>
            </motion.div>
        </div>
    );
}
