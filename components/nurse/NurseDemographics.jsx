'use client'
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowRight, Stethoscope } from 'lucide-react';

export default function NurseDemographics({ onNavigateToZungScale }) {
    const [formData, setFormData] = useState({
        name: '',
        nira: '',
        age: '',
        gender: '',
        workDuration: '',
        education: '',
        unit: '',
        shift: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onNavigateToZungScale();
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-2xl mx-auto py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-4 shadow-lg">
                        <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-blue-700 mb-2">Data Demografi Perawat</h1>
                    <p className="text-gray-600">Lengkapi informasi profesional Anda</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Nama lengkap Anda"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nira" className="text-gray-700">
                                    NIRA / NIP <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="nira"
                                    type="text"
                                    placeholder="Nomor Induk Registrasi"
                                    value={formData.nira}
                                    onChange={(e) => setFormData({ ...formData, nira: e.target.value })}
                                    className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-gray-700">
                                    Usia <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="age"
                                    type="number"
                                    placeholder="Contoh: 30"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                                    min="20"
                                    max="70"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender" className="text-gray-700">
                                    Jenis Kelamin <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                                    required
                                >
                                    <SelectTrigger className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400">
                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Laki-laki</SelectItem>
                                        <SelectItem value="female">Perempuan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="workDuration" className="text-gray-700">
                                Lama Bekerja sebagai Perawat HD <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.workDuration}
                                onValueChange={(value) => setFormData({ ...formData, workDuration: value })}
                                required
                            >
                                <SelectTrigger className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400">
                                    <SelectValue placeholder="Pilih durasi" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="<1year">Kurang dari 1 tahun</SelectItem>
                                    <SelectItem value="1-3years">1-3 tahun</SelectItem>
                                    <SelectItem value="3-5years">3-5 tahun</SelectItem>
                                    <SelectItem value="5-10years">5-10 tahun</SelectItem>
                                    <SelectItem value=">10years">Lebih dari 10 tahun</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="education" className="text-gray-700">
                                Pendidikan Terakhir <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.education}
                                onValueChange={(value) => setFormData({ ...formData, education: value })}
                                required
                            >
                                <SelectTrigger className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400">
                                    <SelectValue placeholder="Pilih pendidikan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="d3">D3 Keperawatan</SelectItem>
                                    <SelectItem value="s1">S1 Keperawatan (Ners)</SelectItem>
                                    <SelectItem value="s2">S2 Keperawatan</SelectItem>
                                    <SelectItem value="s3">S3 Keperawatan</SelectItem>
                                    <SelectItem value="specialist">Spesialis Keperawatan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="unit" className="text-gray-700">
                                Unit / Rumah Sakit <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="unit"
                                type="text"
                                placeholder="Contoh: Unit Hemodialisis RS Harapan"
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="shift" className="text-gray-700">
                                Shift Kerja <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.shift}
                                onValueChange={(value) => setFormData({ ...formData, shift: value })}
                                required
                            >
                                <SelectTrigger className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400">
                                    <SelectValue placeholder="Pilih shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="morning">Pagi (07:00 - 14:00)</SelectItem>
                                    <SelectItem value="afternoon">Siang (14:00 - 21:00)</SelectItem>
                                    <SelectItem value="night">Malam (21:00 - 07:00)</SelectItem>
                                    <SelectItem value="rotating">Shift Bergantian</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <p className="text-blue-800 text-sm">
                                <strong>Catatan:</strong> Data demografi ini membantu kami memahami profil perawat
                                dan menganalisis hasil penelitian sesuai karakteristik profesional.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg cursor-pointer"
                        >
                            Lanjutkan ke Skala Kecemasan
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
