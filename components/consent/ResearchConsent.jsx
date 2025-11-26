'use client'
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { FileText, CheckCircle2 } from 'lucide-react';
import { motion } from "framer-motion";


export default function ResearchConsent({ onNavigateToRoleSelection }) {
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('accept');

    const handleConsent = (accepted) => {
        setModalType(accepted ? 'accept' : 'decline');
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (modalType === 'accept') {
            onNavigateToRoleSelection();
        }
    };

    return (
        <div className="min-h-screen p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-teal-700 mb-2">Informed Consent Penelitian</h1>
                    <p className="text-gray-600">Mohon baca dengan seksama sebelum melanjutkan</p>
                </div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-4 text-gray-700">
                            {/* Semua konten tetap sama */}
                            <section>
                                <h3 className="text-teal-700 mb-3">Pendahuluan</h3>
                                <p>
                                    Anda diundang untuk berpartisipasi dalam penelitian yang berjudul <strong>"Pengaruh Intervensi
                                        Teknik Relaksasi terhadap Tingkat Kecemasan Pasien Hemodialisis"</strong>. Penelitian ini
                                    dilakukan oleh tim peneliti dari Fakultas Keperawatan untuk memahami dan meningkatkan
                                    kualitas perawatan pasien hemodialisis.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-teal-700 mb-3">Tujuan Penelitian</h3>
                                <p>
                                    Penelitian ini bertujuan untuk mengevaluasi efektivitas berbagai teknik relaksasi
                                    (seperti terapi musik, pernapasan dalam, dan guided imagery) dalam mengurangi tingkat
                                    kecemasan pada pasien yang menjalani hemodialisis rutin. Data yang dikumpulkan akan
                                    membantu mengembangkan protokol perawatan yang lebih baik.
                                </p>
                            </section>
                            <section>
                                <h3 className="text-teal-700 mb-3">Prosedur Penelitian</h3>
                                <p>
                                    Jika Anda setuju untuk berpartisipasi, Anda akan diminta untuk:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
                                    <li>Mengisi kuesioner data demografi</li>
                                    <li>Menyelesaikan Skala Kecemasan Zung (SAS)</li>
                                    <li>Membaca modul edukasi tentang teknik relaksasi</li>
                                    <li>Memilih dan mengikuti sesi intervensi teknik relaksasi</li>
                                    <li>Mengisi kuesioner pengetahuan pre-test dan post-test</li>
                                </ul>
                                <p className="mt-2">
                                    Total waktu yang dibutuhkan sekitar 45-60 menit.
                                </p>
                            </section>
                            <section>
                                <h3 className="text-teal-700 mb-3">Risiko dan Manfaat</h3>
                                <p className="mb-2">
                                    <strong>Risiko:</strong> Risiko minimal. Beberapa pertanyaan mungkin menimbulkan
                                    ketidaknyamanan emosional ringan. Anda dapat melewati pertanyaan apa pun atau
                                    menghentikan partisipasi kapan saja.
                                </p>
                                <p>
                                    <strong>Manfaat:</strong> Anda akan mempelajari teknik relaksasi yang dapat membantu
                                    mengurangi kecemasan selama sesi hemodialisis. Kontribusi Anda akan membantu
                                    meningkatkan perawatan untuk pasien hemodialisis di masa depan.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-teal-700 mb-3">Kerahasiaan</h3>
                                <p>
                                    Semua informasi yang Anda berikan akan dijaga kerahasiaannya. Data akan disimpan
                                    secara anonim menggunakan kode identifikasi, dan hanya tim peneliti yang memiliki
                                    akses. Hasil penelitian akan dipublikasikan tanpa identitas pribadi Anda.
                                </p>
                            </section>
                            <section>
                                <h3 className="text-teal-700 mb-3">Partisipasi Sukarela</h3>
                                <p>
                                    Partisipasi Anda bersifat sukarela. Anda dapat memilih untuk tidak berpartisipasi
                                    atau mengundurkan diri dari penelitian kapan saja tanpa konsekuensi terhadap
                                    perawatan medis Anda.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-teal-700 mb-3">Kontak</h3>
                                <p>
                                    Jika Anda memiliki pertanyaan tentang penelitian ini, silakan hubungi:
                                </p>
                                <div className="mt-2 p-4 bg-blue-50 rounded-xl">
                                    <p><strong>Dr. Ns. Siti Rahmawati, M.Kep</strong></p>
                                    <p>Email: siti.rahmawati@university.ac.id</p>
                                    <p>Telepon: +62 21 1234 5678</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={() => handleConsent(false)}
                        variant="outline"
                        className="flex-1 h-14 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        Tidak Bersedia
                    </Button>
                    <Button
                        onClick={() => handleConsent(true)}
                        className="flex-1 h-14 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg cursor-pointer"
                    >
                        Saya Bersedia
                    </Button>
                </div>
            </motion.div>

            {/* Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent open={showModal} className="sm:max-w-md rounded-3xl">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center ${modalType === 'accept'
                                    ? 'bg-gradient-to-br from-teal-400 to-blue-500'
                                    : 'bg-gray-100'
                                    }`}
                            >
                                <CheckCircle2
                                    className={`w-8 h-8 ${modalType === 'accept' ? 'text-white' : 'text-gray-500'
                                        }`}
                                />
                            </div>
                        </div>
                        <DialogTitle className="text-center">
                            {modalType === 'accept'
                                ? 'Terima kasih telah berpartisipasi!'
                                : 'Terima kasih atas perhatian Anda.'}
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-600 mb-6">
                        {modalType === 'accept'
                            ? 'Kontribusi Anda sangat berarti...'
                            : 'Keputusan Anda kami hormati...'}
                    </p>

                    <Button
                        onClick={handleModalClose}
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                    >
                        {modalType === 'accept' ? 'Lanjutkan' : 'Tutup'}
                    </Button>
                </DialogContent>
            </Dialog>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #14b8a6;
          border-radius: 10px;
        }
      `}</style>
        </div>
    );
}
