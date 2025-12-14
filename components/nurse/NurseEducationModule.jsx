'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Tabs from '@/components/ui/tabs';
import { BookOpen, CheckCircle, Download, Video, FileText } from 'lucide-react';

export default function NurseEducationModule() {
    const [completedModules, setCompletedModules] = useState([]);

    const modules = [
        {
            id: 'intro',
            title: 'Pengantar',
            icon: BookOpen,
            content: `
        Selamat datang di modul edukasi teknik relaksasi untuk perawat hemodialisis. 
        Modul ini dirancang untuk meningkatkan pemahaman Anda tentang manajemen kecemasan 
        pada pasien hemodialisis dan berbagai teknik relaksasi yang dapat diterapkan.

            Sebagai perawat, Anda memiliki peran penting dalam membantu pasien mengatasi 
            kecemasan selama sesi dialisis. Penelitian menunjukkan bahwa kecemasan dapat 
            mempengaruhi hasil pengobatan dan kualitas hidup pasien.

        Melalui modul ini, Anda akan mempelajari:
        • Patofisiologi kecemasan pada pasien HD
        • Berbagai teknik relaksasi yang evidence-based
        • Cara mengajarkan dan memandu pasien
        • Evaluasi efektivitas intervensi
      `,
        },
        {
            id: 'anxiety',
            title: 'Kecemasan pada Pasien HD',
            icon: FileText,
            content: `
        Prevalensi & Dampak:
        Studi menunjukkan bahwa 25-50% pasien hemodialisis mengalami kecemasan tingkat 
        sedang hingga berat. Kecemasan ini dapat berdampak pada:

        • Kepatuhan terhadap program dialisis
        • Kualitas tidur dan nafsu makan
        • Tekanan darah selama sesi dialisis
        • Kualitas hidup secara keseluruhan
        • Tingkat depresi dan isolasi sosial

        Faktor Penyebab:
        • Ketergantungan pada mesin dialisis
        • Ketidakpastian tentang masa depan
        • Perubahan gaya hidup dan diet
        • Dampak finansial
        • Nyeri dan ketidaknyamanan fisik
        • Ketakutan akan komplikasi

        Tanda & Gejala:
        • Fisik: Jantung berdebar, berkeringat, gemetar
        • Kognitif: Sulit konsentrasi, pikiran negatif
        • Emosional: Gelisah, mudah marah, takut
        • Perilaku: Menghindari, agitasi, insomnia
      `,
        },
        {
            id: 'music',
            title: 'Terapi Musik',
            icon: Video,
            content: `
        Dasar Teori:
        Terapi musik menggunakan musik sebagai alat terapeutik untuk mengurangi kecemasan. 
        Musik dapat mempengaruhi sistem saraf otonom, menurunkan kadar kortisol, dan 
        merangsang pelepasan endorfin.

        Evidence Base:
        • Meta-analisis menunjukkan penurunan kecemasan sebesar 30-40%
        • Efektif dalam menurunkan tekanan darah dan detak jantung
        • Meningkatkan saturasi oksigen
        • Memperbaiki mood dan kualitas tidur

        Implementasi untuk Perawat:
        1. Pilih musik dengan tempo 60-80 bpm (slow tempo)
        2. Genre yang direkomendasikan: klasik, ambient, nature sounds
        3. Gunakan headphone untuk pengalaman optimal
        4. Durasi: 20-30 menit selama sesi dialisis
        5. Perhatikan preferensi individual pasien

        Tips Praktis:
        • Mulai musik 5-10 menit sebelum kanulasi
        • Monitor respons pasien (ekspresi wajah, tanda vital)
        • Dokumentasikan jenis musik dan respon pasien
        • Buat playlist yang variatif untuk berbagai pasien
      `,
        },
        {
            id: 'breathing',
            title: 'Teknik Pernapasan',
            icon: Video,
            content: `
        Dasar Fisiologi:
        Pernapasan dalam mengaktifkan sistem saraf parasimpatik, yang memicu respons 
        relaksasi alami tubuh.

        Jenis-jenis Teknik:

        1. Pernapasan Diafragma (4-4-6)
        2. Box Breathing (4-4-4-4)
        3. 4-7-8 Breathing

        Cara Mengajarkan:
        1. Demonstrasikan teknik
        2. Beri instruksi bertahap
        3. Pandu dengan suara tenang
        4. Mulai dari 5 repetisi

        Kontraindikasi:
        • Hipertensi tidak terkontrol
        • Gangguan pernapasan berat
      `,
        },
        {
            id: 'imagery',
            title: 'Guided Imagery',
            icon: Video,
            content: `<h3>Konsep Dasar</h3>
                        <p>
                            Guided imagery adalah teknik visualisasi terpandu.
                        </p>

                        <h3>Script Contoh</h3>
                        <blockquote>
                            <p>
                                "Bayangkan Anda berada di pantai yang tenang...<br />
                                Rasakan pasir hangat...<br />
                                Dengar ombak lembut..."
                            </p>
                        </blockquote>

                        <h3>Tips Implementasi</h3>
                        <ul>
                            <li>Gunakan suara lembut</li>
                            <li>Beri jeda antar kalimat</li>
                            <li>Durasi 15–20 menit</li>
                        </ul>`,
        },
        {
            id: 'pmr',
            title: 'Progressive Muscle Relaxation',
            icon: Video,
            content: `<h3>Prinsip Dasar</h3>
                    <p>
                        PMR (Progressive Muscle Relaxation) menegangkan dan merilekskan otot secara sistematis.
                    </p>
                    <h3>Manfaat</h3>
                    <ul>
                        <li>Mengurangi ketegangan otot</li>
                        <li>Menurunkan kecemasan</li>
                    </ul>

                    <h3>Protokol 10 Kelompok Otot</h3>
                    <ol>
                        <li>Tangan kanan</li>
                        <li>Tangan kiri</li>
                        <li>Lengan atas kanan</li>
                        <li>Dan seterusnya hingga 10 kelompok otot</li>
                    </ol>

                    <h3>Modifikasi untuk Pasien Hemodialisis (HD)</h3>
                    <ul>
                        <li>Fokus pada otot yang jauh dari fistula</li>
                        <li>Hindari gerakan ekstrem</li>
                    </ul>`,
        },
        {
            id: 'evaluation',
            title: 'Evaluasi & Dokumentasi',
            icon: FileText,
            content: `
        Indikator Keberhasilan:

        Objektif:
        • Penurunan tekanan darah
        • Penurunan heart rate

        Subjektif:
        • Pasien merasa lebih tenang

        Dokumentasi yang Efektif:
        • Pre, during, post intervention

        Format Dokumentasi:
        "Pasien cemas 7/10, dilakukan terapi musik 20 menit..."
      `,
        },
    ];

    const toggleModule = (moduleId) => {
        if (completedModules.includes(moduleId)) {
            setCompletedModules(completedModules.filter((id) => id !== moduleId));
        } else {
            setCompletedModules([...completedModules, moduleId]);
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 mb-4 shadow-lg">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-700 mb-2">E-Module Edukasi Perawat</h1>
                    <p className="text-gray-600">Manajemen Kecemasan & Teknik Relaksasi</p>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-gray-900">Progress Pembelajaran</h3>
                        <span className="text-blue-600">
                            {completedModules.length} / {modules.length} Modul
                        </span>
                    </div>
                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-linear-to-r from-blue-500 to-teal-500 h-full transition-all duration-500"
                            style={{
                                width: `${(completedModules.length / modules.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Tabs */}
                <Tabs
                    modules={modules}
                    completedModules={completedModules}
                    toggleModule={toggleModule}
                />

                {/* Completion Message */}
                {completedModules.length === modules.length && (
                    <div className="mt-6 bg-linear-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-green-900 mb-2">
                                    Selamat! Anda telah menyelesaikan semua modul!
                                </h3>
                                <p className="text-green-800 text-sm">
                                    Pengetahuan ini akan sangat membantu Anda dalam memberikan
                                    perawatan terbaik pada pasien hemodialisis.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
