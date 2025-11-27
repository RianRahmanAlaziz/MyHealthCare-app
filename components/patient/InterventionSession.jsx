'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, CheckCircle2, Volume2, Heart } from 'lucide-react';

export default function InterventionSession({ intervention }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const interventionData = {
        music: {
            title: 'Terapi Musik',
            duration: 1200,
            image: 'https://images.unsplash.com/photo-1741770067276-a10e15ff5197?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            instructions: [
                'Gunakan headphone untuk pengalaman terbaik',
                'Duduk atau berbaring dengan nyaman',
                'Tutup mata Anda dan fokus pada musik',
                'Biarkan pikiran Anda tenang',
                'Bernapas perlahan dan dalam',
            ],
            color: 'from-purple-400 to-pink-500',
        },
        breathing: {
            title: 'Pernapasan Dalam',
            duration: 900,
            image: 'https://images.unsplash.com/photo-1713428856240-100df77350bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            instructions: [
                'Duduk dengan posisi tegak dan nyaman',
                'Letakkan satu tangan di dada, satu di perut',
                'Tarik napas dalam-dalam melalui hidung (4 detik)',
                'Tahan napas sebentar (4 detik)',
                'Hembuskan perlahan melalui mulut (6 detik)',
                'Ulangi pola pernapasan ini',
            ],
            color: 'from-blue-400 to-cyan-500',
        },
        imagery: {
            title: 'Guided Imagery',
            duration: 1200,
            image: 'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            instructions: [
                'Tutup mata Anda dengan lembut',
                'Bayangkan tempat yang tenang (pantai, taman, dll)',
                'Fokus pada detail: warna, suara, aroma',
                'Rasakan ketenangan dari tempat tersebut',
                'Bernapas perlahan sambil memvisualisasikan',
            ],
            color: 'from-teal-400 to-green-500',
        },
        pmr: {
            title: 'Progressive Muscle Relaxation',
            duration: 1500,
            image: 'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
            instructions: [
                'Berbaring atau duduk dengan nyaman',
                'Kencangkan otot kaki selama 5 detik, lalu lepaskan',
                'Lanjutkan ke otot betis, paha, perut',
                'Kencangkan dan lepaskan setiap kelompok otot',
                'Rasakan perbedaan antara tegang dan rileks',
            ],
            color: 'from-orange-400 to-red-500',
        },
    };

    const currentIntervention = interventionData[intervention] || interventionData.music;

    useEffect(() => {
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
    }, [isPlaying, isCompleted, currentIntervention.duration]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

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

                <div className="text-center mb-8">
                    <h1 className="text-teal-700 mb-2">{currentIntervention.title}</h1>
                    <p className="text-gray-600">Sesi Relaksasi Terpandu</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">

                    <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-800">
                        <Image
                            src={currentIntervention.image}
                            alt={currentIntervention.title}
                            fill
                            className="object-cover opacity-60"
                            sizes="100vw"
                            priority
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentIntervention.color} flex items-center justify-center shadow-2xl`}>
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
                                    className={`h-full bg-gradient-to-r ${currentIntervention.color} transition-all duration-300`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {!isCompleted ? (
                            <div className="flex gap-4 mb-6">
                                <Button
                                    onClick={handlePlayPause}
                                    className={`flex-1 h-14 rounded-xl text-white shadow-lg bg-gradient-to-r ${currentIntervention.color}`}
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
                                        className="h-14 rounded-xl border-2 border-gray-300"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 border-2 border-teal-200 mb-6">
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
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm">
                                            {index + 1}
                                        </span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-purple-100">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
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
