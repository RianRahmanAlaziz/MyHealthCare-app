'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Brain, CheckCircle2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useQuestions from '../hooks/useQuestions';
import useAssessment from '../hooks/useAssessment';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ZungScale({ onNavigateToEducation }) {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const { questions, loading } = useQuestions();
    const { submitAssessment } = useAssessment();
    const [submitting, setSubmitting] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const scale = [
        { value: 1, label: 'Jarang' },
        { value: 2, label: 'Kadang-kadang' },
        { value: 3, label: 'Sering' },
        { value: 4, label: 'Selalu' },
    ];


    const handleAnswer = (value) => {
        const questionId = questions[currentQuestion].id;

        setAnswers(prev => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleNext = async () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            return;
        }

        try {
            setSubmitting(true);
            await submitAssessment(answers);
            setShowModal(true);
        } catch (err) {
            // error sudah ditangani di hook
        } finally {
            setSubmitting(false); // ✅ stop loading
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };


    const handleModalClose = () => {
        setShowModal(false);
        router.push(`/patient/intervention-selection`);
    };

    if (loading) {
        return (
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="max-w-2xl w-full space-y-6 animate-pulse">

                    {/* Header Skeleton */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200" />
                        <div className="h-4 w-56 bg-gray-200 rounded" />
                        <div className="h-3 w-40 bg-gray-100 rounded" />
                    </div>

                    {/* Progress Skeleton */}
                    <div className="bg-white rounded-2xl shadow p-6 space-y-3">
                        <div className="flex justify-between">
                            <div className="h-3 w-32 bg-gray-200 rounded" />
                            <div className="h-3 w-10 bg-gray-200 rounded" />
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full" />
                    </div>

                    {/* Question Skeleton */}
                    <div className="bg-white rounded-3xl shadow p-8 space-y-6">
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                        <div className="h-3 w-2/3 bg-gray-100 rounded" />

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className="h-12 w-full bg-gray-100 rounded-xl"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="flex gap-4">
                        <div className="h-12 flex-1 bg-gray-300 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!questions.length) return <p className="text-center mt-10">Soal tidak tersedia</p>;

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const currentId = questions[currentQuestion].id;

    return (
        <div className="min-h-screen p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 mb-4 shadow-lg">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-700 mb-2">Skala Kecemasan Zung (SAS)</h1>
                    <p className="text-gray-600">Self-Rating Anxiety Scale</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">Pertanyaan {currentQuestion + 1} dari {questions.length}</span>
                        <span className="text-blue-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-linear-to-r from-blue-500 to-teal-500 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mb-4">
                            <span>{currentQuestion + 1}</span>
                        </div>
                        <h2 className="text-gray-900 mb-2">{questions[currentQuestion].question}</h2>
                        <p className="text-gray-600 text-sm">
                            Pilih jawaban yang paling sesuai dengan kondisi Anda dalam 7 hari terakhir
                        </p>
                    </div>

                    <RadioGroup
                        value={answers[currentId]?.toString() || ""}
                        onValueChange={(value) => handleAnswer(parseInt(value))}
                        className="space-y-3"
                    >
                        {scale.map((option) => {
                            const isActive = answers[currentId] === option.value;

                            return (
                                <motion.div
                                    key={option.value}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: option.value * 0.05 }}
                                    onClick={() => handleAnswer(option.value)}   // ⭐ INI KUNCI NYA
                                    className={`flex items-center space-x-3 p-4 rounded-xl border-2
                transition-all cursor-pointer
                hover:bg-gray-50
                ${isActive
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200"
                                        }`}
                                >
                                    <RadioGroupItem
                                        value={option.value.toString()}
                                        id={`q${currentId}-${option.value}`}
                                    />

                                    <Label
                                        htmlFor={`q${currentId}-${option.value}`}
                                        className="flex-1 cursor-pointer text-gray-700"
                                    >
                                        <span>{option.label}</span>
                                    </Label>
                                </motion.div>
                            );
                        })}
                    </RadioGroup>

                </motion.div>

                {/* Navigation */}
                <div className="flex gap-4">
                    {currentQuestion > 0 && (
                        <Button
                            onClick={handlePrevious}
                            variant="outline"
                            className=" cursor-pointer flex-1 h-12 rounded-xl border-2 border-gray-300"
                        >
                            Sebelumnya
                        </Button>
                    )}

                    <Button
                        onClick={handleNext}
                        disabled={!answers[currentId] || submitting}
                        className="cursor-pointer flex-1 h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    > {submitting ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" />
                            Mengirim...
                        </span>
                    ) : (
                        <>
                            {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                    )}
                    </Button>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <p className="text-blue-800 text-sm">
                        <strong>Informasi:</strong> Tidak ada jawaban yang benar atau salah.
                        Jawablah dengan jujur sesuai dengan perasaan Anda.
                    </p>
                </div>
            </motion.div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent open={showModal} className="sm:max-w-md rounded-3xl">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center
                        bg-linear-to-br from-teal-400 to-blue-500`} >
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <DialogTitle className="text-center leading-6 mb-6">
                            Selamat! <br /> Anda Telah Menyelesaikan Semua Pertanyaan!
                        </DialogTitle>
                    </DialogHeader>

                    <Button
                        onClick={handleModalClose}
                        className="w-full h-12 rounded-xl cursor-pointer bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white" >
                        Lanjutkan
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
