"use client";

import { motion } from "motion/react";
import { CheckCircle, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatientCompletion() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md text-center"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-br from-teal-400 to-teal-600 rounded-full mb-6 shadow-2xl"
                >
                    <CheckCircle className="w-16 h-16 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-blue-900 mb-4"
                >
                    Terima Kasih!
                </motion.h1>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-6"
                >
                    <p className="text-blue-900 mb-4">
                        Anda telah menyelesaikan seluruh rangkaian penelitian dengan baik.
                    </p>

                    <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl p-6 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Heart className="w-5 h-5 text-teal-600" />
                            <span className="text-teal-900">Partisipasi Anda Sangat Berarti</span>
                        </div>

                        <p className="text-blue-700 text-sm">
                            Kontribusi Anda membantu meningkatkan kualitas perawatan hemodialisis
                            untuk pasien di masa depan.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-blue-50 rounded-xl p-3">
                            <div className="flex justify-center mb-1">
                                <Star className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-2xl text-blue-900">100%</p>
                            <p className="text-xs text-blue-600">Selesai</p>
                        </div>

                        <div className="bg-teal-50 rounded-xl p-3">
                            <div className="flex justify-center mb-1">
                                <CheckCircle className="w-5 h-5 text-teal-600" />
                            </div>
                            <p className="text-2xl text-teal-900">7</p>
                            <p className="text-xs text-teal-600">Tahapan</p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-3">
                            <div className="flex justify-center mb-1">
                                <Heart className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-2xl text-blue-900">1</p>
                            <p className="text-xs text-blue-600">Intervensi</p>
                        </div>
                    </div>

                    <p className="text-blue-600 text-sm">
                        Data Anda telah tersimpan dengan aman dan akan digunakan untuk keperluan penelitian.
                    </p>
                </motion.div>

                {/* Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Button
                        onClick={() => window.location.reload()}
                        className="w-full h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg"
                    >
                        Kembali ke Beranda
                    </Button>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-blue-600 text-sm mt-6"
                >
                    Jika ada pertanyaan, silakan hubungi tim peneliti
                </motion.p>
            </motion.div>
        </div>
    );
}
