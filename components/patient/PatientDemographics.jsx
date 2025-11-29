"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, User } from 'lucide-react';

export default function PatientDemographics({ onNavigateToZungExplanation }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        initials: '',
        age: '',
        gender: '',
        hdDuration: '',
        education: '',
        occupation: '',
        maritalStatus: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            onNavigateToZungExplanation();
        }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto py-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-teal-400 to-blue-500 mb-4 shadow-lg">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-teal-700 mb-2">Data Demografi Pasien</h1>
                    <p className="text-gray-600">Langkah {step} dari 2</p>
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
                    <div
                        className="bg-linear-to-r from-teal-500 to-blue-500 h-full transition-all duration-300"
                        style={{ width: `${(step / 2) * 100}%` }}
                    />
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {step === 1 ? (
                            <>
                                {/* Initials */}
                                <div className="space-y-2">
                                    <Label htmlFor="initials" className="text-gray-700">
                                        Nama Inisial <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="initials"
                                        type="text"
                                        placeholder="Contoh: AS"
                                        value={formData.initials}
                                        onChange={(e) =>
                                            setFormData({ ...formData, initials: e.target.value })
                                        }
                                        className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                        maxLength={3}
                                        required
                                    />
                                    <p className="text-sm text-gray-500">
                                        Inisial untuk menjaga kerahasiaan identitas
                                    </p>
                                </div>

                                {/* Age */}
                                <div className="space-y-2">
                                    <Label htmlFor="age" className="text-gray-700">
                                        Usia <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="Contoh: 45"
                                        value={formData.age}
                                        onChange={(e) =>
                                            setFormData({ ...formData, age: e.target.value })
                                        }
                                        className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-400"
                                        min="18"
                                        max="100"
                                        required
                                    />
                                </div>

                                {/* Gender */}
                                <div className="space-y-2 ">
                                    <Label htmlFor="gender" className="text-gray-700">
                                        Jenis Kelamin <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, gender: value })
                                        }
                                    >
                                        <SelectTrigger className="h-12 border-gray-200 rounded-xl cursor-pointer">
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Laki-laki</SelectItem>
                                            <SelectItem value="female">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* HD Duration */}
                                <div className="space-y-2">
                                    <Label htmlFor="hdDuration" className="text-gray-700">
                                        Lama Menjalani Hemodialisis <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.hdDuration}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, hdDuration: value })
                                        }
                                    >
                                        <SelectTrigger className="h-12 border-gray-200 rounded-xl cursor-pointer">
                                            <SelectValue placeholder="Pilih durasi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="<6months">Kurang dari 6 bulan</SelectItem>
                                            <SelectItem value="6-12months">6-12 bulan</SelectItem>
                                            <SelectItem value="1-2years">1-2 tahun</SelectItem>
                                            <SelectItem value="2-5years">2-5 tahun</SelectItem>
                                            <SelectItem value=">5years">Lebih dari 5 tahun</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Education */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700">
                                        Pendidikan Terakhir <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.education}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, education: value })
                                        }
                                    >
                                        <SelectTrigger className="h-12 border-gray-200 rounded-xl cursor-pointer">
                                            <SelectValue placeholder="Pilih pendidikan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="elementary">SD</SelectItem>
                                            <SelectItem value="junior-high">SMP</SelectItem>
                                            <SelectItem value="senior-high">SMA/SMK</SelectItem>
                                            <SelectItem value="diploma">Diploma</SelectItem>
                                            <SelectItem value="bachelor">S1</SelectItem>
                                            <SelectItem value="master">S2</SelectItem>
                                            <SelectItem value="doctoral">S3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Occupation */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700">
                                        Pekerjaan <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.occupation}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, occupation: value })
                                        }
                                    >
                                        <SelectTrigger className="h-12 border-gray-200 rounded-xl cursor-pointer    ">
                                            <SelectValue placeholder="Pilih pekerjaan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unemployed">Tidak Bekerja</SelectItem>
                                            <SelectItem value="private">Karyawan Swasta</SelectItem>
                                            <SelectItem value="government">PNS/TNI/POLRI</SelectItem>
                                            <SelectItem value="entrepreneur">Wiraswasta</SelectItem>
                                            <SelectItem value="farmer">Petani/Nelayan</SelectItem>
                                            <SelectItem value="retired">Pensiunan</SelectItem>
                                            <SelectItem value="other">Lainnya</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Marital Status */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700">
                                        Status Pernikahan <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.maritalStatus}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, maritalStatus: value })
                                        }
                                    >
                                        <SelectTrigger className="h-12 border-gray-200 rounded-xl cursor-pointer">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="single">Belum Menikah</SelectItem>
                                            <SelectItem value="married">Menikah</SelectItem>
                                            <SelectItem value="divorced">Cerai</SelectItem>
                                            <SelectItem value="widowed">Janda/Duda</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-blue-800 text-sm">
                                        <strong>Informasi:</strong> Data demografi ini membantu analisis karakteristik partisipan.
                                    </p>
                                </div>
                            </>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            {step === 2 && (
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    className="flex-1 h-12 rounded-xl border-2 border-gray-300 cursor-pointer"
                                >
                                    Kembali
                                </Button>
                            )}

                            <Button
                                type="submit"
                                className="flex-1 h-12 rounded-xl bg-linear-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg cursor-pointer"
                            >
                                {step === 1 ? 'Selanjutnya' : 'Lanjutkan'}
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}
