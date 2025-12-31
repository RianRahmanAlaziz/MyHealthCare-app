'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Tabs from '@/components/ui/tabs';
import axiosInstance from '@/lib/axiosInstance';
import { BookOpen, CheckCircle2, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function NurseEducationModule({ onNavigateToLoginDashboard }) {
    const [showModal, setShowModal] = useState(false);
    const [completedModules, setCompletedModules] = useState([]);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (
            modules.length > 0 &&
            completedModules.length === modules.length
        ) {
            setShowModal(true);
        }
    }, [completedModules, modules]);



    const handleModalClose = () => {
        setShowModal(false);
        onNavigateToLoginDashboard()
    };

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const res = await axiosInstance.get(`/e-modul`);
                setModules(res.data.data.data);
            } catch (error) {
                console.error('Gagal mengambil modul', error);
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, []);

    const toggleModule = (moduleId) => {
        setCompletedModules((prev) => {
            if (prev.includes(moduleId)) {
                return prev.filter((id) => id !== moduleId);
            }
            return [...prev, moduleId];
        });
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Memuat modul...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 mb-4 shadow-lg">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-700 mb-2">E-Module Edukasi Perawat</h1>
                    <p className="text-gray-600">Manajemen Kecemasan & Teknik Relaksasi</p>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-gray-900">Progress Pembelajaran</h3>
                        <span className="text-blue-600">
                            {completedModules.length} / {modules.length} Modul
                        </span>
                    </div>
                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                            className="bg-linear-to-r from-blue-500 to-teal-500 h-full transition-all duration-500"
                            style={{
                                width: `${(completedModules.length / modules.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Tabs */}
                <Tabs
                    modules={modules}
                    completedModules={completedModules}
                    toggleModule={toggleModule}
                />
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent open={showModal} className="sm:max-w-md rounded-3xl">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center
                        bg-linear-to-br from-teal-400 to-blue-500`} >
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <DialogTitle className="text-center">
                            Selamat! <br /> Anda telah menyelesaikan semua modul!
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-center text-gray-600 mb-6">
                        Pengetahuan ini akan sangat membantu Anda dalam memberikan
                        perawatan terbaik pada pasien hemodialisis.
                    </p>

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
