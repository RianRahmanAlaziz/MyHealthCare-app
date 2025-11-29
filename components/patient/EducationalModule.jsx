import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Wind, Music, Droplet, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

const modules = [
    {
        id: 1,
        icon: Wind,
        title: 'Teknik Pernapasan',
        color: 'from-blue-400 to-blue-600',
        content: `
      Teknik pernapasan adalah metode relaksasi yang mengatur pola napas untuk mengurangi stres dan kecemasan.
      
      **Manfaat:**
      • Menurunkan detak jantung dan tekanan darah
      • Mengurangi ketegangan otot
      • Meningkatkan oksigenasi tubuh
      • Memberikan rasa tenang dan rileks
      
      **Cara Melakukan:**
      1. Duduk atau berbaring dengan nyaman
      2. Tarik napas dalam melalui hidung selama 4 hitungan
      3. Tahan napas selama 4 hitungan
      4. Hembuskan napas perlahan melalui mulut selama 6 hitungan
      5. Ulangi 5-10 kali
      
      **Tips:**
      • Lakukan di tempat yang tenang
      • Fokus pada pergerakan perut, bukan dada
      • Praktikkan secara teratur untuk hasil optimal
    `,
    },
    {
        id: 2,
        icon: Music,
        title: 'Terapi Musik',
        color: 'from-teal-400 to-teal-600',
        content: `
      Terapi musik menggunakan elemen musik untuk meningkatkan kesehatan fisik dan mental, mengurangi kecemasan selama hemodialisis.
      
      **Manfaat:**
      • Mengalihkan perhatian dari prosedur medis
      • Menurunkan tingkat kecemasan dan stres
      • Meningkatkan mood dan relaksasi
      • Mengurangi persepsi nyeri
      
      **Jenis Musik yang Direkomendasikan:**
      • Musik klasik instrumental
      • Musik alam (suara air, hujan, burung)
      • Musik meditasi
      • Musik dengan tempo lambat (60-80 bpm)
      
      **Tips Penggunaan:**
      • Gunakan headphone untuk pengalaman optimal
      • Pilih volume yang nyaman, tidak terlalu keras
      • Pilih musik yang Anda sukai dan memberikan rasa tenang
    `,
    },
    {
        id: 3,
        icon: Droplet,
        title: 'Relaksasi Progresif',
        color: 'from-blue-500 to-teal-500',
        content: `
      Relaksasi otot progresif adalah teknik yang melibatkan tegangan dan relaksasi kelompok otot secara berurutan untuk mengurangi ketegangan fisik.
      
      **Manfaat:**
      • Mengurangi ketegangan otot
      • Meningkatkan kesadaran tubuh
      • Mengurangi gejala kecemasan fisik
      • Membantu tidur lebih baik
      
      **Cara Melakukan:**
      1. Mulai dari kaki: tegang otot kaki selama 5 detik, lalu lepaskan
      2. Pindah ke betis, paha, perut, dada, tangan, lengan, bahu, leher, dan wajah
      3. Rasakan perbedaan antara otot yang tegang dan rileks
      4. Bernapas teratur selama proses
      
      **Urutan Latihan:**
      • Kaki dan jari kaki
      • Betis dan paha
      • Perut dan dada
      • Tangan dan lengan
      • Bahu dan leher
      • Wajah (dahi, mata, rahang)
    `,
    },
];

export function EducationalModule({ onComplete }) {
    const [currentModule, setCurrentModule] = useState(0);
    const [completedModules, setCompletedModules] = useState([]);

    const progress = ((completedModules.length + 1) / modules.length) * 100;
    const module = modules[currentModule];
    const Icon = module.icon;

    const handleNext = () => {
        if (!completedModules.includes(module.id)) {
            setCompletedModules([...completedModules, module.id]);
        }

        if (currentModule < modules.length - 1) {
            setCurrentModule(currentModule + 1);
        } else {
            onComplete();
        }
    };

    const handleModuleSelect = (index) => {
        setCurrentModule(index);
    };

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
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-900 mb-2">E-Module Edukasi</h1>
                    <p className="text-blue-600">Pelajari teknik relaksasi</p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-900">Progress</span>
                        <span className="text-sm text-blue-600">
                            {completedModules.length + 1}/{modules.length}
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Module Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {modules.map((mod, index) => {
                        const ModIcon = mod.icon;
                        const isCompleted = completedModules.includes(mod.id);
                        const isCurrent = index === currentModule;

                        return (
                            <button
                                key={mod.id}
                                onClick={() => handleModuleSelect(index)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${isCurrent
                                    ? 'bg-linear-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                                    : isCompleted
                                        ? 'bg-teal-50 text-teal-700'
                                        : 'bg-white text-blue-600 shadow'
                                    }`}
                            >
                                {isCompleted && !isCurrent ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <ModIcon className="w-4 h-4" />
                                )}
                                <span className="text-sm">{mod.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Card */}
                <motion.div
                    key={currentModule}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden"
                >
                    {/* Module Header */}
                    <div className={`bg-linear-to-r ${module.color} p-6`}>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                                <Icon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-white">{module.title}</h2>
                        </div>
                    </div>

                    {/* Module Content */}
                    <ScrollArea className="flex-1 p-6 md:p-8">
                        <div className="prose prose-blue max-w-none">
                            {module.content.split('\n').map((paragraph, idx) => {
                                const trimmed = paragraph.trim();
                                if (!trimmed) return null;

                                if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                                    return (
                                        <h3 key={idx} className="text-teal-600 mt-6 mb-3">
                                            {trimmed.slice(2, -2)}
                                        </h3>
                                    );
                                }

                                if (trimmed.startsWith('•')) {
                                    return (
                                        <li key={idx} className="text-blue-900 ml-4">
                                            {trimmed.slice(1).trim()}
                                        </li>
                                    );
                                }

                                if (/^\d+\./.test(trimmed)) {
                                    return (
                                        <li key={idx} className="text-blue-900 ml-4">
                                            {trimmed.replace(/^\d+\.\s*/, '')}
                                        </li>
                                    );
                                }

                                return (
                                    <p key={idx} className="text-blue-900 mb-4">
                                        {trimmed}
                                    </p>
                                );
                            })}
                        </div>
                    </ScrollArea>

                    {/* Action Button */}
                    <div className="p-6 border-t border-blue-100">
                        <Button
                            onClick={handleNext}
                            className="w-full h-12 rounded-xl bg-linear-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg"
                        >
                            {currentModule < modules.length - 1 ? 'Modul Selanjutnya' : 'Selesai Belajar'}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
