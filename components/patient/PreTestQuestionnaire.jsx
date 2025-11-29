import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ClipboardCheck, ArrowRight } from 'lucide-react';

export default function PreTestQuestionnaire({ onNavigateToSession }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            id: 1,
            question: 'Apa yang dimaksud dengan teknik relaksasi?',
            options: [
                'A. Metode untuk meningkatkan tekanan darah',
                'B. Cara untuk mengurangi stres dan kecemasan',
                'C. Olahraga berat untuk kesehatan',
                'D. Terapi dengan obat-obatan',
            ],
        },
        {
            id: 2,
            question: 'Manfaat utama dari terapi musik adalah...',
            options: [
                'A. Meningkatkan kecemasan',
                'B. Menurunkan detak jantung dan mengurangi stres',
                'C. Mengganggu konsentrasi',
                'D. Meningkatkan tekanan darah',
            ],
        },
        {
            id: 3,
            question: 'Pernapasan dalam dapat membantu...',
            options: [
                'A. Meningkatkan kecemasan',
                'B. Mengaktifkan sistem saraf untuk rileks',
                'C. Mempercepat detak jantung',
                'D. Mengurangi oksigen dalam tubuh',
            ],
        },
        {
            id: 4,
            question: 'Guided imagery adalah teknik yang melibatkan...',
            options: [
                'A. Olahraga berat',
                'B. Visualisasi tempat yang tenang',
                'C. Minum obat penenang',
                'D. Mendengarkan suara keras',
            ],
        },
        {
            id: 5,
            question: 'Durasi yang ideal untuk sesi teknik relaksasi adalah...',
            options: [
                'A. 5 menit',
                'B. 15-30 menit',
                'C. 2 jam',
                'D. 5 jam',
            ],
        },
        {
            id: 6,
            question: 'Kecemasan pada pasien hemodialisis dapat disebabkan oleh...',
            options: [
                'A. Ketergantungan pada mesin dialisis',
                'B. Perubahan gaya hidup',
                'C. Kekhawatiran tentang masa depan',
                'D. Semua jawaban benar',
            ],
        },
        {
            id: 7,
            question: 'Salah satu tanda kecemasan adalah...',
            options: [
                'A. Detak jantung melambat',
                'B. Peningkatan nafsu makan',
                'C. Kesulitan berkonsentrasi',
                'D. Tidur lebih lama',
            ],
        },
        {
            id: 8,
            question: 'Progressive muscle relaxation adalah...',
            options: [
                'A. Teknik menegangkan dan merilekskan otot secara bertahap',
                'B. Olahraga angkat beban',
                'C. Pijat dengan minyak',
                'D. Terapi minum air',
            ],
        },
    ];

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [currentQuestion]: value });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onNavigateToSession();
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
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
                        <ClipboardCheck className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-teal-700 mb-2">Kuesioner Pengetahuan</h1>
                    <p className="text-gray-600">Pre-Test: Uji pemahaman Anda</p>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">
                            Pertanyaan {currentQuestion + 1} dari {questions.length}
                        </span>
                        <span className="text-teal-600">{Math.round(progress)}%</span>
                    </div>

                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-linear-to-r from-teal-500 to-blue-500 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 text-teal-700 mb-4">
                            <span>{currentQuestion + 1}</span>
                        </div>

                        <h2 className="text-gray-900 mb-6">{questions[currentQuestion].question}</h2>

                        <RadioGroup
                            value={answers[currentQuestion] || ''}
                            onValueChange={handleAnswer}
                            className="space-y-4"
                        >
                            {questions[currentQuestion].options.map((option, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <RadioGroupItem
                                        value={option}
                                        id={`q${currentQuestion}-${index}`}
                                        className="mt-1"
                                    />

                                    <Label
                                        htmlFor={`q${currentQuestion}-${index}`}
                                        className="flex-1 cursor-pointer text-gray-700 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        {option}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>

                {/* Buttons */}
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
                        className="flex-1 h-12 rounded-xl bg-linear-to-r from-teal-500 to-blue-500 
            hover:from-teal-600 hover:to-blue-600 text-white shadow-lg 
            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        Jawab dengan jujur berdasarkan pemahaman Anda dari modul edukasi
                    </p>
                </div>

            </div>
        </div>
    );
}
