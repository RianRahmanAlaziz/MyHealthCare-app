"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FileText, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function InformedConsent({ onConsent }) {
    const [showModal, setShowModal] = useState(false);
    const [consentGiven, setConsentGiven] = useState(null);

    const handleConsent = (consented) => {
        setConsentGiven(consented);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (consentGiven !== null) {
            onConsent(consentGiven);
        }
    };

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
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-900 mb-2">Informed Consent Penelitian</h1>
                    <p className="text-blue-600">Silakan baca dengan seksama</p>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden"
                >
                    <ScrollArea className="flex-1 p-6 md:p-8">
                        <div className="space-y-4 text-blue-900">
                            <h2 className="text-teal-600">Pengantar</h2>

                            <p>
                                Kami mengundang Anda untuk berpartisipasi dalam penelitian yang bertujuan untuk
                                mengevaluasi efektivitas intervensi relaksasi pada pasien hemodialisis.
                            </p>

                            <h3 className="text-teal-600 mt-6">Tujuan Penelitian</h3>

                            <p>
                                Penelitian ini bertujuan untuk mengidentifikasi dan mengevaluasi teknik relaksasi.
                            </p>

                            <h3 className="text-teal-600 mt-6">Prosedur Penelitian</h3>

                            <p>Jika Anda setuju untuk berpartisipasi, Anda akan diminta untuk:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Mengisi kuesioner data demografi</li>
                                <li>Melengkapi Skala Kecemasan Zung</li>
                                <li>Membaca modul edukasi</li>
                                <li>Memilih dan mengikuti intervensi relaksasi</li>
                                <li>Mengisi pre-test dan post-test</li>
                            </ul>

                            <h3 className="text-teal-600 mt-6">Kerahasiaan Data</h3>

                            <p>
                                Semua informasi akan dijaga kerahasiaannya dan disimpan secara anonim.
                            </p>

                            <h3 className="text-teal-600 mt-6">Risiko dan Manfaat</h3>

                            <p>
                                Risiko minimal, manfaat berupa akses teknik relaksasi.
                            </p>

                            <h3 className="text-teal-600 mt-6">Hak Partisipan</h3>

                            <p>
                                Partisipasi sukarela dan dapat berhenti kapan saja.
                            </p>

                            <h3 className="text-teal-600 mt-6">Kontak Peneliti</h3>

                            <p>
                                Jika ada pertanyaan, silakan hubungi tim peneliti.
                            </p>

                            <div className="bg-blue-50 rounded-xl p-4 mt-6">
                                <p>
                                    Dengan memilih “Saya Bersedia”, Anda menyatakan memahami informasi ini.
                                </p>
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Buttons */}
                    <div className="p-6 border-t border-blue-100 space-y-3">
                        <Button
                            onClick={() => handleConsent(true)}
                            className="w-full h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                        >
                            <CheckCircle className="mr-2 w-5 h-5" />
                            Saya Bersedia
                        </Button>

                        <Button
                            onClick={() => handleConsent(false)}
                            variant="outline"
                            className="w-full h-12 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            <XCircle className="mr-2 w-5 h-5" />
                            Tidak Bersedia
                        </Button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="rounded-3xl max-w-sm mx-auto">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            {consentGiven ? (
                                <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                                    <XCircle className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </div>

                        <DialogTitle className="text-center text-blue-900">
                            {consentGiven ? "Terima Kasih!" : "Terima Kasih"}
                        </DialogTitle>

                        <DialogDescription className="text-center text-blue-600">
                            {consentGiven
                                ? "Terima kasih telah berpartisipasi."
                                : "Terima kasih atas perhatian Anda."}
                        </DialogDescription>
                    </DialogHeader>

                    <Button
                        onClick={handleModalClose}
                        className="w-full h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 text-white"
                    >
                        Lanjutkan
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
