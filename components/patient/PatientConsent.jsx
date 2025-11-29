"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PatientConsent({ onComplete }) {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="min-h-screen flex flex-col p-6 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl mx-auto flex-1 flex flex-col"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-teal-500 rounded-2xl mb-4 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-900 mb-2">Informed Consent Pasien</h1>
                    <p className="text-blue-600">Kerahasiaan & Tujuan Penelitian</p>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden"
                >
                    <ScrollArea className="flex-1 p-6 md:p-8">
                        <div className="space-y-4 text-blue-900">
                            <h2 className="text-teal-600">Kepada Yth. Calon Partisipan Penelitian</h2>

                            <p>
                                Kami mengundang Anda untuk berpartisipasi dalam penelitian tentang efektivitas
                                teknik relaksasi pada pasien hemodialisis. Partisipasi Anda sangat berharga
                                untuk membantu meningkatkan kualitas perawatan.
                            </p>

                            <div className="bg-blue-50 rounded-xl p-4">
                                <h3 className="text-teal-600 mb-2">Kerahasiaan Data</h3>
                                <p>
                                    Semua informasi pribadi yang Anda berikan akan dijaga kerahasiaannya. Data
                                    Anda akan disimpan secara anonim menggunakan kode inisial, dan hanya peneliti
                                    yang memiliki akses ke informasi ini.
                                </p>
                            </div>

                            <h3 className="text-teal-600 mt-4">Yang Akan Anda Lakukan:</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Mengisi data demografi dasar</li>
                                <li>Membaca penjelasan tentang Skala Kecemasan Zung</li>
                                <li>Mempelajari modul edukasi relaksasi</li>
                                <li>Memilih satu teknik relaksasi</li>
                                <li>Mengisi kuesioner sebelum & sesudah intervensi</li>
                                <li>Mengikuti sesi intervensi relaksasi</li>
                            </ul>

                            <div className="bg-teal-50 rounded-xl p-4">
                                <h3 className="text-teal-600 mb-2">Manfaat Bagi Anda:</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Mengurangi kecemasan</li>
                                    <li>Mendapat edukasi kesehatan</li>
                                    <li>Berperan membantu kualitas layanan</li>
                                </ul>
                            </div>

                            <p>
                                Partisipasi Anda bersifat sukarela. Anda dapat mengundurkan diri kapan saja
                                tanpa mempengaruhi kualitas perawatan.
                            </p>

                            <p>
                                Jika ada pertanyaan, silakan hubungi tim peneliti.
                            </p>
                        </div>
                    </ScrollArea>

                    {/* Consent Checkbox */}
                    <div className="p-6 border-t border-blue-100">
                        <div className="flex items-start gap-3 mb-4 bg-blue-50 rounded-xl p-4">
                            <Checkbox
                                id="consent"
                                checked={agreed}
                                onCheckedChange={(checked) => setAgreed(!!checked)}
                                className="mt-1"
                            />
                            <label htmlFor="consent" className="text-blue-900 cursor-pointer flex-1">
                                Saya telah membaca dan memahami informasi di atas. Saya setuju untuk
                                berpartisipasi secara sukarela.
                            </label>
                        </div>

                        <Button
                            onClick={onComplete}
                            disabled={!agreed}
                            className="w-full h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CheckCircle className="mr-2 w-5 h-5" />
                            Saya Setuju
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
