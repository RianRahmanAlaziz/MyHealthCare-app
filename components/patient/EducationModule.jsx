"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { useSearchParams } from "next/navigation";

export default function EducationModule({ onNavigateToIntervention }) {
    const [expandedSection, setExpandedSection] = useState(null);
    const [progress, setProgress] = useState(0);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [sections, setSections] = useState([]);

    useEffect(() => {
        if (!id) return;

        axiosInstance
            .get(`/intervention/${id}/education`)
            .then(res => {
                const titles = res.data.title || [];
                const contents = res.data.content || [];

                const merged = titles.map((title, i) => ({
                    title,
                    content: contents[i] ?? "",
                }));

                setSections(merged);
            });
    }, [id]);


    const toggleSection = (index) => {
        if (expandedSection === index) {
            setExpandedSection(null);
        } else {
            setExpandedSection(index);
            const newProgress = Math.max(
                progress,
                ((index + 1) / sections.length) * 100
            );
            setProgress(newProgress);
        }
    };

    return (
        <div className="min-h-screen p-6 pb-32">
            <div className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-teal-700 mb-2">E-Module Edukasi</h1>
                    <p className="text-gray-600">Pelajari tentang kecemasan dan teknik relaksasi</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Progress Pembelajaran</span>
                        <span className="text-teal-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-linear-to-r from-teal-500 to-blue-500 h-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Hero Image */}
                {/* <div className="mb-6 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src="https://images.unsplash.com/photo-1635545999375-057ee4013deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                        alt="Meditation and Wellness"
                        width={1080}
                        height={720}
                        className="rounded-xl object-cover"
                        priority
                    />
                </div> */}

                {/* Accordion */}
                <div className="space-y-4 mb-6">
                    {sections.map((section, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${progress >= ((index + 1) / sections.length) * 100
                                            ? "bg-linear-to-br from-teal-400 to-blue-500"
                                            : "bg-gray-200"
                                            }`}
                                    >
                                        {progress >= ((index + 1) / sections.length) * 100 ? (
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        ) : (
                                            <span className="text-gray-600">{index + 1}</span>
                                        )}
                                    </div>
                                    <h3 className="text-gray-900 text-left">{section.title}</h3>
                                </div>

                                {expandedSection === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            {expandedSection === index && (
                                <div className="px-6 pb-6">
                                    <div className="pl-14">
                                        <p className="text-gray-700 leading-relaxed">{section.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Info Card */}
                <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-teal-100 mb-6">
                    <h3 className="text-gray-900 mb-2">Tips Pembelajaran</h3>
                    <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex gap-2">
                            <span className="text-teal-600">✓</span> Baca setiap bagian dengan seksama
                        </li>
                        <li className="flex gap-2">
                            <span className="text-teal-600">✓</span> Anda dapat kembali ke bagian manapun
                        </li>
                        <li className="flex gap-2">
                            <span className="text-teal-600">✓</span> Catat teknik yang menarik untuk Anda
                        </li>
                    </ul>
                </div>

                {/* Bottom Button */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-linear-to-t from-white via-white to-transparent">
                    <div className="max-w-2xl mx-auto">
                        <Button
                            onClick={onNavigateToIntervention}
                            disabled={progress < 100}
                            className="w-full h-14 rounded-xl bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {progress < 100
                                ? "Selesaikan Pembelajaran untuk Melanjutkan"
                                : "Lanjutkan ke Pemilihan Intervensi"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
