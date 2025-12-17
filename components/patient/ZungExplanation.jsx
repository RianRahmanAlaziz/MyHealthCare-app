"use client";

import { Button } from "@/components/ui/button";
import { Heart, Smile, Frown, Meh, AlertCircle } from "lucide-react";

export default function ZungExplanation({ onNavigateToZungScale }) {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-teal-700 mb-2">Skala Kecemasan Zung (SAS)</h1>
                    <p className="text-gray-600">Memahami tingkat kecemasan Anda</p>
                </div>

                {/* Main Box */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <h2 className="text-gray-900 mb-4">Apa itu Skala Zung?</h2>
                    <p className="text-gray-700 mb-6">
                        Skala Kecemasan Zung (Zung Self-Rating Anxiety Scale) adalah alat yang digunakan
                        untuk mengukur tingkat kecemasan seseorang. Skala ini terdiri dari 20 pertanyaan
                        mengenai gejala kecemasan yang mungkin Anda alami.
                    </p>

                    <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-teal-100 mb-6">
                        <h3 className="text-gray-900 mb-4">Mengapa Ini Penting?</h3>

                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-teal-600 mt-1">✓</span>
                                <span>Membantu mengidentifikasi tingkat kecemasan Anda saat ini</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-teal-600 mt-1">✓</span>
                                <span>Menentukan intervensi yang paling sesuai untuk Anda</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-teal-600 mt-1">✓</span>
                                <span>Mengukur efektivitas teknik relaksasi yang Anda pilih</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Info Cara Mengisi */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-6">
                    <h3 className="text-blue-900 mb-2">Cara Mengisi</h3>

                    <ul className="space-y-2 text-blue-800 text-sm">
                        <li className="flex gap-2"><span>1.</span><span>Jawab sesuai kondisi Anda sekarang.</span></li>
                        <li className="flex gap-2"><span>2.</span><span>Tidak ada jawaban benar atau salah.</span></li>
                        <li className="flex gap-2"><span>3.</span><span>Pilih jawaban yang paling sesuai.</span></li>
                        <li className="flex gap-2"><span>4.</span><span>Waktu yang dibutuhkan 5–10 menit.</span></li>
                    </ul>
                </div>

                {/* Button */}
                <Button
                    onClick={onNavigateToZungScale}
                    className="w-full h-14 rounded-xl bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg cursor-pointer"
                >
                    Saya Mengerti, Lanjutkan
                </Button>

            </div>
        </div>
    );
}
