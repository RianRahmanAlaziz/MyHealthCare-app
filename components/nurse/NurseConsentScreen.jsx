'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Stethoscope, ClipboardCheck, UserCheck } from 'lucide-react';

export default function NurseConsentScreen({ onNavigateToDemographics }) {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 mb-4 shadow-lg">
                        <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-700 mb-2">Informed Consent Perawat</h1>
                    <p className="text-gray-600">Evaluasi Pengetahuan dan Keterampilan</p>
                </div>

                {/* Content Cards */}
                <div className="space-y-4 mb-8">
                    {/* Purpose Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <ClipboardCheck className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-gray-900 mb-2">Tujuan Penelitian</h3>
                                <p className="text-gray-600 mb-3">
                                    Penelitian ini bertujuan untuk mengevaluasi:
                                </p>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Pengetahuan perawat tentang manajemen kecemasan pada pasien hemodialisis</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Pemahaman tentang berbagai teknik relaksasi dan aplikasinya</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Tingkat kecemasan perawat dalam memberikan perawatan</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span>Efektivitas program edukasi teknik relaksasi untuk perawat</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Participation Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                                <UserCheck className="w-6 h-6 text-teal-600" />
                            </div>
                            <div>
                                <h3 className="text-gray-900 mb-2">Yang Akan Anda Lakukan</h3>
                                <p className="text-gray-600 mb-3">Sebagai partisipan, Anda akan:</p>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-teal-500">1.</span>
                                        <span>Mengisi data demografi (nama, NIRA, lama bekerja, dll)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-teal-500">2.</span>
                                        <span>Menyelesaikan Skala Kecemasan Zung (SAS) - 20 pertanyaan</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-teal-500">3.</span>
                                        <span>Membaca modul edukasi tentang teknik relaksasi</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-teal-500">4.</span>
                                        <span>Mengisi kuesioner evaluasi pengetahuan</span>
                                    </li>
                                </ul>
                                <p className="text-gray-600 text-sm mt-3">
                                    <strong>Estimasi waktu:</strong> 30-40 menit
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Benefits Card */}
                    <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                        <h3 className="text-gray-900 mb-3">Manfaat untuk Anda</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">✓</span>
                                <span>Meningkatkan pengetahuan tentang manajemen kecemasan pasien</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">✓</span>
                                <span>Mempelajari teknik relaksasi yang dapat diajarkan kepada pasien</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">✓</span>
                                <span>Mendapatkan sertifikat partisipasi penelitian</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600">✓</span>
                                <span>Berkontribusi pada pengembangan protokol perawatan yang lebih baik</span>
                            </li>
                        </ul>
                    </div>

                    {/* Confidentiality Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-gray-900 mb-3">Kerahasiaan Data</h3>
                        <p className="text-gray-600 text-sm">
                            Semua data yang Anda berikan akan dijaga kerahasiaannya. Informasi pribadi hanya
                            akan digunakan untuk keperluan penelitian dan tidak akan dibagikan kepada pihak ketiga.
                            Hasil penelitian akan dipublikasikan tanpa mencantumkan identitas pribadi Anda.
                        </p>
                    </div>
                </div>

                {/* Consent Checkbox */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-start gap-4">
                        <Checkbox
                            id="nurse-consent"
                            checked={agreed}
                            onCheckedChange={(checked) => setAgreed(!!checked)}
                            className="mt-1"
                        />
                        <label htmlFor="nurse-consent" className="text-gray-700 cursor-pointer">
                            <span className="block mb-1">
                                <strong>Saya Setuju</strong>
                            </span>
                            <span className="text-sm text-gray-600">
                                Saya telah membaca dan memahami tujuan penelitian ini. Saya setuju untuk
                                berpartisipasi secara sukarela dan memberikan data yang akurat. Saya memahami
                                bahwa saya dapat mengundurkan diri kapan saja tanpa konsekuensi.
                            </span>
                        </label>
                    </div>
                </div>

                {/* Continue Button */}
                <Button
                    onClick={onNavigateToDemographics}
                    disabled={!agreed}
                    className="w-full h-14 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    Lanjutkan
                </Button>
            </div>
        </div>
    );
}
