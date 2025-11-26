'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { Music, Wind, Brain, Heart, CheckCircle } from 'lucide-react';

export default function InterventionSelection({ onSelectIntervention }) {
    const [selected, setSelected] = useState(null);

    const interventions = [
        {
            id: 'music',
            title: 'Terapi Musik',
            description: 'Mendengarkan musik relaksasi yang menenangkan untuk mengurangi kecemasan',
            icon: Music,
            color: 'from-purple-400 to-pink-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            benefits: ['Menurunkan detak jantung', 'Mengurangi stres', 'Meningkatkan mood'],
            duration: '20-30 menit',
            image:
                'https://images.unsplash.com/photo-1741770067276-a10e15ff5197?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        },
        {
            id: 'breathing',
            title: 'Pernapasan Dalam',
            description: 'Teknik pernapasan terpandu untuk mencapai ketenangan',
            icon: Wind,
            color: 'from-blue-400 to-cyan-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            benefits: ['Meningkatkan oksigenasi', 'Menenangkan pikiran', 'Mudah dilakukan'],
            duration: '15-20 menit',
            image:
                'https://images.unsplash.com/photo-1713428856240-100df77350bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        },
        {
            id: 'imagery',
            title: 'Guided Imagery',
            description: 'Visualisasi terpandu ke tempat yang tenang dan damai',
            icon: Brain,
            color: 'from-teal-400 to-green-500',
            bgColor: 'bg-teal-50',
            borderColor: 'border-teal-200',
            benefits: ['Mengurangi kecemasan', 'Meningkatkan fokus', 'Efek relaksasi mendalam'],
            duration: '20-25 menit',
            image:
                'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        },
        {
            id: 'pmr',
            title: 'Progressive Muscle Relaxation',
            description: 'Relaksasi otot bertahap untuk melepaskan ketegangan fisik',
            icon: Heart,
            color: 'from-orange-400 to-red-500',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            benefits: ['Mengurangi ketegangan otot', 'Meningkatkan kesadaran tubuh', 'Tidur lebih baik'],
            duration: '25-30 menit',
            image:
                'https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        },
    ];

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
                        const Icon = intervention.icon;
                        const isSelected = selected === intervention.id;

                        return (
                            <button
                                key={intervention.id}
                                onClick={() => setSelected(intervention.id)}
                                className={`bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isSelected ? 'ring-4 ring-teal-400' : ''
                                    }`}
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <Image
                                        src={intervention.image}
                                        alt={intervention.title}
                                        width={500}
                                        height={300}
                                        className="w-full h-full object-cover"
                                    />

                                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br ${intervention.color} flex items-center justify-center shadow-lg`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>

                                    {isSelected && (
                                        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                                            <CheckCircle className="w-6 h-6 text-teal-500" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 text-left">
                                    <h3 className="text-gray-900 mb-2">{intervention.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4">{intervention.description}</p>

                                    <div className={`${intervention.bgColor} rounded-xl p-3 border ${intervention.borderColor} mb-3`}>
                                        <p className="text-xs text-gray-600 mb-2">Manfaat:</p>
                                        <ul className="space-y-1">
                                            {intervention.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-2 text-xs text-gray-700">
                                                    <span className="text-teal-500 mt-0.5">✓</span>
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="text-sm text-gray-500">
                                        Durasi: {intervention.duration}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-teal-100 mb-6">
                    <h3 className="text-gray-900 mb-3">Informasi Penting</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Semua teknik relaksasi efektif secara ilmiah</li>
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Perawat akan memandu Anda selama sesi</li>
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Anda bebas menghentikan sesi kapan saja</li>
                        <li className="flex items-start gap-2"><span className="text-teal-600 mt-1">•</span>Pilih teknik yang sesuai dengan kondisi Anda</li>
                    </ul>
                </div>

                {/* Bottom Button */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
                    <div className="max-w-4xl mx-auto">
                        <Button
                            onClick={() => selected && onSelectIntervention(selected)}
                            disabled={!selected}
                            className="w-full h-14 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg disabled:opacity-50"
                        >
                            {selected ? 'Lanjutkan dengan Teknik yang Dipilih' : 'Pilih Teknik Relaksasi Terlebih Dahulu'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
