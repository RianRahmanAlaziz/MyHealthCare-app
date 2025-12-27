'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { Music, Wind, Brain, Heart, CheckCircle } from 'lucide-react';
import * as LucideIcons from "lucide-react";
import axiosInstance from '@/lib/axiosInstance';

export default function InterventionSelection({ onSelectIntervention }) {
    const [selected, setSelected] = useState(null);
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState([]);


    useEffect(() => {
        fetchInterventions();
        fetchCompleted();
    }, []);

    const fetchCompleted = async () => {
        try {
            const res = await axiosInstance.get("/intervention/completed");
            setCompleted(res.data.data); // array berisi id intervention yang sudah selesai
        } catch (err) {
            console.error("Gagal memuat completed:", err);
        }
    };

    const fetchInterventions = async () => {
        try {
            const res = await axiosInstance.get("/intervention");
            setInterventions(res.data.data.data); // karena pagination Laravel
        } catch (error) {
            console.error("Gagal memuat intervention:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen p-6 pb-32 animate-pulse">
                <div className="max-w-4xl mx-auto py-8">

                    {/* Header Skeleton */}
                    <div className="text-center mb-8">
                        <div className="h-6 w-64 bg-gray-200 rounded mx-auto mb-3"></div>
                        <div className="h-4 w-80 bg-gray-200 rounded mx-auto mb-4"></div>
                        <div className="h-8 w-72 bg-gray-200 rounded-full mx-auto"></div>
                    </div>

                    {/* Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="bg-white rounded-3xl shadow-lg overflow-hidden"
                            >
                                {/* Image */}
                                <div className="h-40 bg-gray-200"></div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>

                                    {/* Benefits */}
                                    <div className="bg-gray-100 rounded-xl p-3 mb-3">
                                        <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 w-full bg-gray-200 rounded"></div>
                                            <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>

                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Info Box Skeleton */}
                    <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                        <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* Bottom Button Skeleton */}
                    <div className="fixed bottom-0 left-0 right-0 p-6 bg-white">
                        <div className="max-w-4xl mx-auto">
                            <div className="h-14 bg-gray-200 rounded-xl"></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 pb-32">
            <div className="max-w-4xl mx-auto py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-teal-700 mb-2">Pilih Teknik Relaksasi</h1>
                    <p className="text-gray-600 mb-2">Pilih teknik yang paling sesuai dengan preferensi Anda</p>
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200 text-sm">
                        <Heart className="w-4 h-4" />
                        <span>Anda akan didampingi perawat selama sesi</span>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {interventions.map((intervention) => {
                        const isCompleted = completed.includes(intervention.id);
                        const IconComponent = LucideIcons[intervention.icon];
                        const isSelected = selected?.id === intervention.id;
                        const benefits = Array.isArray(intervention.benefits)
                            ? intervention.benefits
                            : intervention.benefits
                                ? JSON.parse(intervention.benefits) // kalau aslinya JSON string
                                : [];

                        return (
                            <button
                                key={intervention.id}
                                onClick={() => setSelected({
                                    id: intervention.id,
                                    slug: intervention.slug
                                })}
                                disabled={isCompleted}
                                className={` bg-white cursor-pointer rounded-3xl shadow-lg overflow-hidden transition-all  ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''} `} >
                                <div className="relative h-40 overflow-hidden">
                                    <video
                                        src={intervention.video_url}
                                        className="w-full h-full object-cover rounded-md"
                                        preload="metadata"
                                    />
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                                        {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
                                    </div>

                                    {isSelected && (
                                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                                            <CheckCircle className="w-6 h-6 text-teal-500" />
                                        </div>
                                    )}
                                    {isCompleted && (
                                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                    )}

                                </div>

                                <div className="p-6 text-left">
                                    <h3 className="text-gray-900 mb-2">{intervention.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{intervention.description}</p>

                                    <div className={`bg-teal-50 rounded-xl p-3 border border-teal-200 mb-3`}>
                                        <p className="text-xs text-gray-600 mb-2">Manfaat:</p>
                                        <ul className="space-y-1">
                                            {benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <span className="text-teal-500 mt-0.5">✓</span>
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Durasi: {Math.ceil(intervention.duration / 60)} menit
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Info Box */}
                <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-teal-100 mb-6">
                    <h3 className="text-gray-900 mb-3">Informasi Penting</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Semua teknik relaksasi efektif secara ilmiah</li>
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Perawat akan memandu Anda selama sesi</li>
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Anda bebas menghentikan sesi kapan saja</li>
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Pilih teknik yang sesuai dengan kondisi Anda</li>
                    </ul>
                </div>

                {/* Bottom Button */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-linear-to-t from-white via-white to-transparent">
                    <div className="max-w-4xl mx-auto">
                        <Button
                            onClick={() =>
                                selected &&
                                onSelectIntervention({ id: selected.id, slug: selected.slug })
                            }
                            disabled={!selected}
                            className="w-full h-14 cursor-pointer rounded-xl bg-linear-to-r from-teal-500 to-blue-500 text-white shadow-lg disabled:opacity-50"
                        >
                            {selected ? 'Lanjutkan dengan Teknik yang Dipilih' : 'Pilih Teknik Relaksasi Terlebih Dahulu'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
