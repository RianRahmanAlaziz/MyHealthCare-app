"use client";

import { motion } from "motion/react";
import { Brain, Smile, Meh, Frown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ZungScaleExplanation({ onComplete }) {
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
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-900 mb-2">Penjelasan Skala Zung</h1>
                    <p className="text-blue-600">Self-Rating Anxiety Scale (SAS)</p>
                </div>

                {/* Content Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden"
                >
                    <ScrollArea className="flex-1 p-6 md:p-8">
                        <div className="space-y-6">

                            {/* Introduction */}
                            <div className="text-blue-900">
                                <h2 className="text-teal-600 mb-3">Apa itu Skala Zung?</h2>
                                <p>
                                    Skala Kecemasan Zung (Zung Self-Rating Anxiety Scale) adalah alat
                                    untuk mengukur tingkat kecemasan seseorang. Skala ini membantu
                                    memahami perasaan Anda dan seberapa sering Anda mengalami gejala kecemasan.
                                </p>
                            </div>

                            {/* Visual Scale */}
                            <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl p-6">
                                <h3 className="text-teal-600 mb-4">Skala Penilaian Emosional</h3>

                                <div className="grid grid-cols-2 gap-4">

                                    {/* Normal */}
                                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-md">
                                        <div className="flex justify-center mb-2">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <Smile className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                        <p className="text-center text-sm text-blue-900">Normal</p>
                                        <p className="text-center text-xs text-blue-600 mt-1">20–44</p>
                                    </motion.div>

                                    {/* Ringan */}
                                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-md">
                                        <div className="flex justify-center mb-2">
                                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                                <Meh className="w-6 h-6 text-yellow-600" />
                                            </div>
                                        </div>
                                        <p className="text-center text-sm text-blue-900">Ringan</p>
                                        <p className="text-center text-xs text-blue-600 mt-1">45–59</p>
                                    </motion.div>

                                    {/* Sedang */}
                                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-md">
                                        <div className="flex justify-center mb-2">
                                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                                <Frown className="w-6 h-6 text-orange-600" />
                                            </div>
                                        </div>
                                        <p className="text-center text-sm text-blue-900">Sedang</p>
                                        <p className="text-center text-xs text-blue-600 mt-1">60–74</p>
                                    </motion.div>

                                    {/* Berat */}
                                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl p-4 shadow-md">
                                        <div className="flex justify-center mb-2">
                                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                                <AlertCircle className="w-6 h-6 text-red-600" />
                                            </div>
                                        </div>
                                        <p className="text-center text-sm text-blue-900">Berat</p>
                                        <p className="text-center text-xs text-blue-600 mt-1">75–80</p>
                                    </motion.div>

                                </div>
                            </div>

                            {/* How it works */}
                            <div className="text-blue-900">
                                <h3 className="text-teal-600 mb-3">Bagaimana Cara Kerjanya?</h3>
                                <p className="mb-3">
                                    Anda akan menjawab 20 pertanyaan mengenai perasaan dan kondisi fisik
                                    yang mungkin Anda alami. Setiap pertanyaan memiliki 4 pilihan:
                                </p>

                                <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm">1</div>
                                        <span>Tidak pernah atau sangat jarang</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm">2</div>
                                        <span>Kadang-kadang</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm">3</div>
                                        <span>Sebagian besar waktu</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm">4</div>
                                        <span>Hampir selalu atau selalu</span>
                                    </div>
                                </div>
                            </div>

                            {/* Important Note */}
                            <div className="bg-teal-50 rounded-xl p-4">
                                <h3 className="text-teal-600 mb-2">Penting untuk Diketahui</h3>
                                <ul className="space-y-2 text-blue-900 text-sm">
                                    <li className="flex gap-2">
                                        <span className="text-teal-600">•</span>
                                        <span>Jawablah sesuai kondisi Anda dalam 1–2 minggu terakhir</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-teal-600">•</span>
                                        <span>Tidak ada jawaban benar atau salah</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-teal-600">•</span>
                                        <span>Jawablah dengan jujur sesuai perasaan Anda</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-teal-600">•</span>
                                        <span>Hasil membantu kami memberi intervensi yang tepat</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </ScrollArea>

                    {/* Button */}
                    <div className="p-6 border-t border-blue-100">
                        <Button
                            onClick={onComplete}
                            className="w-full h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg"
                        >
                            Saya Mengerti, Lanjutkan
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
