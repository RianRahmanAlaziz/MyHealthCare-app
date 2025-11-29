import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ZungSelfAssessment({ onComplete }) {
    const zungItems = [
        'Saya merasa lebih gelisah dan cemas dari biasanya',
        'Saya merasa takut tanpa alasan yang jelas',
        'Saya mudah marah atau panik',
        'Saya merasa seperti akan hancur atau jatuh berkeping-keping',
        'Saya merasa semuanya baik-baik saja dan tidak ada hal buruk yang akan terjadi',
        'Tangan dan kaki saya gemetar',
        'Saya terganggu oleh sakit kepala, nyeri leher, dan nyeri punggung',
        'Saya merasa lemah dan mudah lelah',
        'Saya merasa tenang dan dapat duduk diam dengan mudah',
        'Saya dapat merasakan jantung saya berdebar cepat',
        'Saya terganggu oleh pusing',
        'Saya mengalami pingsan atau merasa akan pingsan',
        'Saya dapat bernapas dengan mudah',
        'Saya mengalami mati rasa dan kesemutan di jari-jari tangan dan kaki',
        'Saya terganggu oleh sakit perut atau gangguan pencernaan',
        'Saya harus buang air kecil lebih sering',
        'Tangan saya biasanya kering dan hangat',
        'Wajah saya terasa panas dan memerah',
        'Saya mudah tertidur dan mendapat tidur malam yang nyenyak',
        'Saya mengalami mimpi buruk',
    ];

    const scaleOptions = [
        { value: 1, label: 'Tidak pernah atau sangat jarang' },
        { value: 2, label: 'Kadang-kadang' },
        { value: 3, label: 'Sebagian besar waktu' },
        { value: 4, label: 'Hampir selalu atau selalu' },
    ];

    const [currentItem, setCurrentItem] = useState(0);
    const [responses, setResponses] = useState({});

    const progress = ((currentItem + 1) / zungItems.length) * 100;
    const answeredCount = Object.keys(responses).length;

    const handleResponse = (value) => {
        setResponses({ ...responses, [currentItem]: parseInt(value) });
    };

    const handleNext = () => {
        if (currentItem < zungItems.length - 1) {
            setCurrentItem(currentItem + 1);
        } else {
            const totalScore = Object.values(responses).reduce((a, b) => a + b, 0);
            console.log('Zung SAS Score:', totalScore);

            onComplete();
        }
    };

    const handlePrevious = () => {
        if (currentItem > 0) {
            setCurrentItem(currentItem - 1);
        }
    };

    const isAnswered = responses[currentItem] !== undefined;

    return (
        <div className="min-h-screen flex flex-col p-6 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl mx-auto flex-1 flex flex-col"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-teal-500 to-teal-700 rounded-2xl mb-4 shadow-lg">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-900 mb-2">Skala Kecemasan Zung (SAS)</h1>
                    <p className="text-blue-600">Self-Rating Anxiety Scale</p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-900">
                            Item {currentItem + 1} dari {zungItems.length}
                        </span>
                        <span className="text-sm text-teal-600">{answeredCount} terjawab</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Assessment Card */}
                <motion.div
                    key={currentItem}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden"
                >
                    <ScrollArea className="flex-1 p-6 md:p-8">
                        {/* Item Number */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-linear-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white">{currentItem + 1}</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-blue-600">
                                    Bagaimana kondisi Anda dalam 1–2 minggu terakhir?
                                </p>
                            </div>
                        </div>

                        {/* Statement */}
                        <div className="bg-linear-to-br from-teal-50 to-blue-50 rounded-2xl p-6 mb-6">
                            <p className="text-blue-900 text-lg">{zungItems[currentItem]}</p>
                        </div>

                        {/* Scale Options */}
                        <div className="space-y-3">
                            <p className="text-sm text-blue-900 mb-4">Pilih jawaban yang paling sesuai:</p>

                            <RadioGroup
                                value={responses[currentItem]?.toString()}
                                onValueChange={handleResponse}
                                className="space-y-3"
                            >
                                {scaleOptions.map((option) => (
                                    <motion.div
                                        key={option.value}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: option.value * 0.05 }}
                                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${responses[currentItem] === option.value
                                            ? 'border-teal-500 bg-teal-50'
                                            : 'border-blue-100 hover:border-teal-200 hover:bg-teal-50/50'
                                            }`}
                                    >
                                        <RadioGroupItem
                                            value={option.value.toString()}
                                            id={`option-${option.value}`}
                                        />
                                        <Label htmlFor={`option-${option.value}`} className="flex-1 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-700">
                                                    {option.value}
                                                </div>
                                                <span className="text-blue-900">{option.label}</span>
                                            </div>
                                        </Label>
                                    </motion.div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Info Note */}
                        <div className="bg-blue-50 rounded-xl p-4 mt-6">
                            <p className="text-xs text-blue-700">
                                Jawablah dengan jujur sesuai kondisi Anda. Tidak ada jawaban yang benar atau salah.
                            </p>
                        </div>
                    </ScrollArea>

                    {/* Navigation Buttons */}
                    <div className="p-6 border-t border-blue-100">
                        <div className="flex gap-3">
                            {currentItem > 0 && (
                                <Button
                                    onClick={handlePrevious}
                                    variant="outline"
                                    className="h-12 rounded-xl border-2 flex-1"
                                >
                                    Item Sebelumnya
                                </Button>
                            )}

                            <Button
                                onClick={handleNext}
                                disabled={!isAnswered}
                                className="h-12 rounded-xl bg-linear-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white shadow-lg flex-1 disabled:opacity-50"
                            >
                                {currentItem < zungItems.length - 1 ? 'Item Selanjutnya' : 'Selesai'}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
