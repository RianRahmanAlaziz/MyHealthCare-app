"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

const questions = [
    {
        id: 1,
        question: 'Apa tujuan utama dari teknik relaksasi pada pasien hemodialisis?',
        options: [
            'Meningkatkan tekanan darah',
            'Mengurangi kecemasan dan stres',
            'Mempercepat proses hemodialisis',
            'Meningkatkan nafsu makan',
        ],
        correct: 1,
    },
    {
        id: 2,
        question: 'Teknik pernapasan dalam dapat membantu mengurangi kecemasan dengan cara:',
        options: [
            'Meningkatkan detak jantung',
            'Mengurangi oksigen dalam darah',
            'Menurunkan detak jantung dan tekanan darah',
            'Meningkatkan ketegangan otot',
        ],
        correct: 2,
    },
    {
        id: 3,
        question: 'Berapa lama durasi ideal untuk satu sesi teknik pernapasan?',
        options: ['1-2 menit', '5-10 menit', '30-45 menit', '1-2 jam'],
        correct: 1,
    },
    {
        id: 4,
        question: 'Manfaat terapi musik untuk pasien hemodialisis meliputi:',
        options: [
            'Hanya menghibur pasien',
            'Mengalihkan perhatian dan menurunkan kecemasan',
            'Mempercepat proses dialisis',
            'Meningkatkan fungsi ginjal',
        ],
        correct: 1,
    },
    {
        id: 5,
        question: 'Relaksasi otot progresif dilakukan dengan cara:',
        options: [
            'Menegangkan semua otot sekaligus',
            'Hanya meregangkan otot kaki',
            'Menegangkan dan melepaskan kelompok otot secara berurutan',
            'Tidak menggerakkan otot sama sekali',
        ],
        correct: 2,
    },
];

export function KnowledgeQuestionnaire({ type, onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const question = questions[currentQuestion];

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [question.id]: parseInt(value) });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onComplete();
        }
    };

    const isAnswered = answers[question.id] !== undefined;

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
                        <ClipboardList className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-900 mb-2">
                        Kuesioner Pengetahuan {type === 'pre' ? 'Pre-test' : 'Post-test'}
                    </h1>
                    <p className="text-blue-600">
                        {type === 'pre'
                            ? 'Ukur pengetahuan Anda sebelum intervensi'
                            : 'Evaluasi pengetahuan Anda setelah intervensi'}
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-900">Pertanyaan</span>
                        <span className="text-sm text-blue-600">
                            {currentQuestion + 1}/{questions.length}
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden"
                >
                    <ScrollArea className="flex-1 p-6 md:p-8">
                        {/* Question Number */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white">{question.id}</span>
                            </div>
                            <span className="text-sm text-blue-600">
                                dari {questions.length} pertanyaan
                            </span>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-blue-900 mb-6">{question.question}</h2>

                        {/* Options */}
                        <RadioGroup
                            value={answers[question.id]?.toString()}
                            onValueChange={handleAnswer}
                            className="space-y-3"
                        >
                            {question.options.map((option, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`flex items-start space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${answers[question.id] === index
                                        ? 'border-blue-400 bg-blue-50'
                                        : 'border-blue-100 hover:border-blue-200 hover:bg-blue-50/50'
                                        }`}
                                >
                                    <RadioGroupItem
                                        value={index.toString()}
                                        id={`option-${index}`}
                                        className="mt-0.5"
                                    />
                                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-blue-900">
                                        {option}
                                    </Label>
                                </motion.div>
                            ))}
                        </RadioGroup>
                    </ScrollArea>

                    {/* Action Button */}
                    <div className="p-6 border-t border-blue-100">
                        <Button
                            onClick={handleNext}
                            disabled={!isAnswered}
                            className="w-full h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {currentQuestion < questions.length - 1
                                ? 'Pertanyaan Selanjutnya'
                                : 'Selesai'}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
