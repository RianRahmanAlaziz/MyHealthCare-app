'use client'

import { useState, useEffect, useMemo } from 'react';
import Image from "next/image";
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, CheckCircle2, Volume2, Heart, ArrowLeft } from 'lucide-react';
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from '@/lib/axiosInstance';

export default function InterventionSession({ params, onNavigateToSelection }) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // ← ID diambil di sini
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentIntervention, setCurrentIntervention] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    // === AMBIL DATA INTERVENTION ===
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axiosInstance.get(`/intervention/${id}`)
            .then(res => {
                const data = res.data.data;

                setCurrentIntervention({
                    ...data,
                    benefits: JSON.parse(data.benefits),
                    instructions: JSON.parse(data.instructions)
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // ⬅ agar tidak loading terus saat error
            });

    }, [id]);

    useEffect(() => {
        if (currentIntervention) {
            document.title = `HealthCare Research | ${currentIntervention.name}`;
        }
    }, [currentIntervention]);

    // === TIMER ===
    useEffect(() => {
        if (!currentIntervention) return;

        let interval;
        if (isPlaying && !isCompleted) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => {
                    if (prev >= currentIntervention.duration) {
                        setIsPlaying(false);
                        setIsCompleted(true);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isPlaying, isCompleted, currentIntervention]);

    useEffect(() => {
        if (isCompleted && currentIntervention && id) {
            axiosInstance.post("/intervention/session-complete", {
                intervention_id: id,
            })
                .then(() => {
                    toast.success('Selamat Telah Menyelesaikan Sesi!');
                    router.push("/patient/intervention-selection");
                })
                .catch(err => console.error("Save failed:", err));
        }
    }, [isCompleted, currentIntervention, id]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Memuat data sesi...</p>
            </div>
        );
    }

    if (!currentIntervention) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Intervention tidak ditemukan.</p>
            </div>
        );
    }

    const progress = (timeElapsed / currentIntervention.duration) * 100;

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setTimeElapsed(0);
        setIsCompleted(false);
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto py-8">
                <button
                    onClick={onNavigateToSelection}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Kembali
                </button>

                <div className="text-center mb-8">
                    <h1 className="text-teal-700 mb-2">{currentIntervention.name}</h1>
                    <p className="text-gray-600">Sesi Relaksasi Terpandu</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
                    <div className="relative h-64 bg-linear-to-br from-gray-900 to-gray-800">
                        <Image
                            src={currentIntervention.image_url}
                            alt={currentIntervention.name}
                            fill
                            className="object-cover opacity-60"
                            sizes="100vw"
                            priority
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-20 h-20 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-2xl`}>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                ) : (
                                    <Volume2 className="w-10 h-10 text-white animate-pulse" />
                                )}
                            </div>
                        </div>

                        {isPlaying && !isCompleted && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-sm text-gray-700">Sedang Berlangsung</span>
                            </div>
                        )}
                    </div>

                    <div className="p-8">

                        <div className="text-center mb-6">
                            <div className="text-4xl text-gray-900 mb-2">
                                {formatTime(timeElapsed)} / {formatTime(currentIntervention.duration)}
                            </div>
                            <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-linear-to-r from-blue-400 to-cyan-500 transition-all duration-300`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {!isCompleted ? (
                            <div className="flex gap-4 mb-6">
                                <Button
                                    onClick={handlePlayPause}
                                    className="flex-1 h-14 cursor-pointer rounded-xl text-white shadow-lg bg-linear-to-r from-blue-400 to-cyan-500"
                                >
                                    {isPlaying ? (
                                        <>
                                            <Pause className="w-5 h-5 mr-2" /> Jeda
                                        </>
                                    ) : (
                                        <>
                                            <Play className="w-5 h-5 mr-2" /> {timeElapsed > 0 ? 'Lanjutkan' : 'Mulai'}
                                        </>
                                    )}
                                </Button>

                                {timeElapsed > 0 && (
                                    <Button
                                        onClick={handleReset}
                                        variant="outline"
                                        className="h-14 cursor-pointer rounded-xl border-2 border-gray-300"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="bg-linear-to-br from-teal-50 to-blue-50 rounded-2xl p-6 border-2 border-teal-200 mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle2 className="w-6 h-6 text-teal-600" />
                                    <h3 className="text-teal-900">Sesi Selesai!</h3>
                                </div>
                                <p className="text-teal-800 text-sm mb-4">
                                    Selamat! Anda telah menyelesaikan sesi relaksasi. Bagaimana perasaan Anda sekarang?
                                </p>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="w-full h-12 rounded-xl border-2 border-teal-400 text-teal-700"
                                >
                                    <RotateCcw className="w-5 h-5 mr-2" />
                                    Ulangi Sesi
                                </Button>
                            </div>
                        )}

                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-gray-900 mb-4">Panduan Sesi:</h3>
                            <ul className="space-y-3">
                                {currentIntervention.instructions.map((instruction, index) => (
                                    <li key={index} className="flex items-start gap-3 text-gray-700">
                                        <span className="shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                                            {index + 1}
                                        </span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                            <Heart className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-gray-900 mb-2">Pendampingan Perawat</h3>
                            <p className="text-gray-700 text-sm">
                                Perawat akan memantau kondisi Anda selama sesi berlangsung. Jika Anda merasa tidak
                                nyaman atau memerlukan bantuan, jangan ragu untuk memberitahu perawat.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
