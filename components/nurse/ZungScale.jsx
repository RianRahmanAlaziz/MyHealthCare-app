'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Heart, ArrowRight } from 'lucide-react';

export default function ZungScale({ onNavigateToEducation }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        'Saya merasa lebih gelisah dan cemas dari biasanya',
        'Saya merasa takut tanpa alasan yang jelas',
        'Saya mudah marah atau panik',
        'Saya merasa seperti akan hancur atau terpisah',
        'Saya merasa semuanya baik-baik saja dan tidak ada hal buruk yang akan terjadi',
        'Tangan dan kaki saya gemetar',
        'Saya terganggu oleh sakit kepala, leher, dan nyeri punggung',
        'Saya merasa lemah dan mudah lelah',
        'Saya merasa tenang dan bisa duduk diam dengan mudah',
        'Saya dapat merasakan jantung saya berdetak cepat',
        'Saya terganggu oleh pusing',
        'Saya mengalami pingsan atau merasa seperti akan pingsan',
        'Saya dapat bernapas dengan mudah',
        'Saya mengalami mati rasa dan kesemutan di jari tangan dan kaki',
        'Saya terganggu oleh sakit perut atau gangguan pencernaan',
        'Saya sering buang air kecil',
        'Tangan saya biasanya kering dan hangat',
        'Wajah saya terasa panas dan memerah',
        'Saya mudah tertidur dan mendapat istirahat yang baik di malam hari',
        'Saya mengalami mimpi buruk',
    ];

    const scale = [
        { value: 1, label: 'Tidak pernah' },
        { value: 2, label: 'Kadang-kadang' },
        { value: 3, label: 'Sering' },
        { value: 4, label: 'Selalu' },
    ];

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [currentQuestion]: value });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
            console.log('Total Zung Score:', totalScore);
            onNavigateToEducation();
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 mb-4 shadow-lg">
                        <Heart className="w-8 h-8 text-white" />
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
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 mb-4">
                            <span>{currentQuestion + 1}</span>
                        </div>
                        <h2 className="text-gray-900 mb-2">{questions[currentQuestion]}</h2>
                        <p className="text-gray-600 text-sm">
                            Pilih jawaban yang paling sesuai dengan kondisi Anda dalam 7 hari terakhir
                        </p>
                    </div>

                    <RadioGroup
                        value={answers[currentQuestion]?.toString() || ''}
                        onValueChange={(value) => handleAnswer(parseInt(value))}
                        className="space-y-3"
                    >
                        {scale.map((option) => (
                            <div
                                key={option.value}
                                className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:bg-gray-50 ${answers[currentQuestion] === option.value
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <RadioGroupItem
                                    value={option.value.toString()}
                                    id={`q${currentQuestion}-${option.value}`}
                                />
                                <Label
                                    htmlFor={`q${currentQuestion}-${option.value}`}
                                    className="flex-1 cursor-pointer text-gray-700"
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option.label}</span>
                                        <span className="text-sm text-gray-500">({option.value})</span>
                                    </div>
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Navigation */}
                <div className="flex gap-4">
                    {currentQuestion > 0 && (
                        <Button
                            onClick={handlePrevious}
                            variant="outline"
                            className="flex-1 h-12 rounded-xl border-2 border-gray-300"
                        >
                            Sebelumnya
                        </Button>
                    )}

                    <Button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion]}
                        className="flex-1 h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <p className="text-blue-800 text-sm">
                        <strong>Informasi:</strong> Tidak ada jawaban yang benar atau salah.
                        Jawablah dengan jujur sesuai dengan perasaan Anda.
                    </p>
                </div>
            </div>
        </div>
    );
}
