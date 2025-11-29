"use client";

import { Button } from "@/components/ui/button";
import { Heart, Smile, Frown, Meh, AlertCircle } from "lucide-react";

export default function ZungExplanation({ onNavigateToEducation }) {
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

                    <h3 className="text-gray-900 mb-4">Tingkat Kecemasan</h3>
                    <p className="text-gray-700 mb-4">
                        Hasil dari skala ini akan menunjukkan tingkat kecemasan Anda:
                    </p>

                    <div className="space-y-3">

                        {/* Normal */}
                        <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <Smile className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-green-900">Normal (20-44)</h4>
                                <p className="text-green-700 text-sm">Tingkat kecemasan normal</p>
                            </div>
                        </div>

                        {/* Ringan */}
                        <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                <Meh className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <h4 className="text-yellow-900">Ringan (45-59)</h4>
                                <p className="text-yellow-700 text-sm">Dapat diatasi dengan relaksasi</p>
                            </div>
                        </div>

                        {/* Sedang */}
                        <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <Frown className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h4 className="text-orange-900">Sedang (60-74)</h4>
                                <p className="text-orange-700 text-sm">Perlu intervensi lebih intensif</p>
                            </div>
                        </div>

                        {/* Berat */}
                        <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-200">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h4 className="text-red-900">Berat (75-80)</h4>
                                <p className="text-red-700 text-sm">Disarankan konsultasi dengan profesional</p>
                            </div>
                        </div>

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
                    onClick={onNavigateToEducation}
                    className="w-full h-14 rounded-xl bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg cursor-pointer"
                >
                    Saya Mengerti, Lanjutkan
                </Button>

            </div>
        </div>
    );
}
