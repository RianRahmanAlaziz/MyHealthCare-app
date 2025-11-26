'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Lock, Eye } from 'lucide-react';

export default function PatientConsentScreen({ onNavigateToDemographics }) {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-teal-700 mb-2">Informed Consent Pasien</h1>
                    <p className="text-gray-600">Perlindungan Data dan Kerahasiaan Anda</p>
                </div>

                {/* Content Cards */}
                <div className="space-y-4 mb-8">

                    {/* Privacy Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Lock className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-gray-900 mb-2">Kerahasiaan Data</h3>
                                <p className="text-gray-600">
                                    Semua informasi pribadi dan data kesehatan Anda akan dijaga kerahasiaannya.
                                    Data akan dienkripsi dan hanya dapat diakses oleh tim peneliti yang berwenang.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Purpose Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                                <Eye className="w-6 h-6 text-teal-600" />
                            </div>
                            <div>
                                <h3 className="text-gray-900 mb-2">Tujuan Pengumpulan Data</h3>
                                <p className="text-gray-600 mb-3">
                                    Data yang dikumpulkan akan digunakan untuk:
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-teal-500 mt-1">•</span>
                                        <span>Evaluasi efektivitas teknik relaksasi untuk mengurangi kecemasan</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-teal-500 mt-1">•</span>
                                        <span>Pengembangan protokol perawatan yang lebih baik</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-teal-500 mt-1">•</span>
                                        <span>Publikasi ilmiah (tanpa identitas pribadi Anda)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Rights Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-teal-100">
                        <h3 className="text-gray-900 mb-3">Hak Anda sebagai Partisipan</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600">✓</span>
                                <span>Anda dapat menolak menjawab pertanyaan tertentu</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600">✓</span>
                                <span>Anda dapat mengundurkan diri kapan saja tanpa konsekuensi</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600">✓</span>
                                <span>Anda berhak meminta penghapusan data Anda</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600">✓</span>
                                <span>Anda akan mendapatkan salinan hasil penelitian jika diminta</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Consent Checkbox */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-start gap-4">
                        <Checkbox
                            id="consent"
                            checked={agreed}
                            onCheckedChange={(checked) => setAgreed(!!checked)}
                            className="mt-1"
                        />
                        <label htmlFor="consent" className="text-gray-700 cursor-pointer">
                            <span className="block mb-1">
                                Saya telah membaca dan memahami informasi di atas, dan saya setuju untuk:
                            </span>
                            <ul className="space-y-1 text-gray-600 text-sm ml-4">
                                <li>• Berpartisipasi dalam penelitian ini</li>
                                <li>• Memberikan data yang akurat dan jujur</li>
                                <li>• Mengikuti prosedur penelitian yang telah dijelaskan</li>
                            </ul>
                        </label>
                    </div>
                </div>

                {/* Continue Button */}
                <Button
                    onClick={onNavigateToDemographics}
                    disabled={!agreed}
                    className="w-full h-14 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Lanjutkan
                </Button>
            </div>
        </div>
    );
}
