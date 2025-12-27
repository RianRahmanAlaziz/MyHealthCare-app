'use client'
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { FileText, CheckCircle2 } from 'lucide-react';
import { motion } from "framer-motion";


export default function ResearchConsent({ onNavigateToRoleSelection, onNavigateToLogin }) {
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
        } else {
            onNavigateToLogin();
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
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
                                <h3 className="text-teal-700 mb-3">Dengan hormat</h3>
                                <p>
                                    Kami mahasiswa <strong>STIKes Widya Dharma Husada Program Studi S1 Keperawatan</strong> <br />
                                    Mengajukan permohonan izin penelitian dan pengambilan data di RSUD Kabupaten Tangerang untuk tugas akhir berjudul:
                                    <strong>“E-Modul Keperawatan dalam Mereduksi Ansietas pada Klien Hemodialisa di RSUD Kabupaten Tangerang.”</strong>
                                </p>
                            </section>

                            <section>
                                <h3 className="text-teal-700 mb-3">Tujuan Penelitian</h3>
                                <p>
                                    Penelitian ini bertujuan merancang, menerapkan, dan mengevaluasi efektivitas e-modul keperawatan dalam membantu klien hemodialisa mengurangi kecemasan selama menjalani terapi.
                                    Mohon baca dan pahami poin berikut sebelum melanjutkan:
                                </p>
                            </section>
                            <section>

                                <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
                                    <li>Partisipasi Anda sepenuhnya sukarela dan dapat dihentikan kapan saja tanpa konsekuensi.</li>
                                    <li>Semua data dijamin anonim dan hanya digunakan untuk kepentingan penelitian.</li>
                                    <li>Wawancara berlangsung ±10–15 menit.</li>
                                    <li>Jika ada pertanyaan, Anda dapat menghubungi peneliti melalui nomor WhatsApp yang tertera.</li>
                                </ul>

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
                        className="flex-1 h-14 rounded-xl bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg cursor-pointer"
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
                                className={`w-16 h-16  rounded-full flex items-center justify-center ${modalType === 'accept'
                                    ? 'bg-linear-to-br from-teal-400 to-blue-500'
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
                        className="w-full h-12 rounded-xl cursor-pointer bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
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
