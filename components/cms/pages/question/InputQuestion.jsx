import { useState, useRef } from 'react';
import Select from "react-select";
import axiosInstance from '@/lib/axiosInstance';

export default function InputQuestion({ formData, setFormData, errors, setErrors, numberStatus, setNumberStatus }) {

    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors?.[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }

        if (name === "number") {

            setNumberStatus("checking");
            clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(async () => {
                try {
                    const res = await axiosInstance.post('/question-check-number', {
                        number: value,
                        id: formData.id ?? null, // aman saat edit
                    });

                    if (res.data.exists) {
                        setNumberStatus("used");
                        setErrors(prev => ({
                            ...prev,
                        }));
                    } else {
                        setNumberStatus("available");
                    }
                } catch (e) {
                    setNumberStatus(null);
                    console.error("Check number gagal");
                }
            }, 400);
        }
    };

    const isOptions = [
        { value: 1, label: "Iya" },
        { value: 0, label: "Tidak" },
    ];
    return (
        <>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="number" className="form-label">Number</label>
                <input
                    id="number"
                    type="number"
                    name="number"
                    value={formData.number || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Nomor pertanyaan"
                    required
                    autoFocus
                />
                {numberStatus === "checking" && (
                    <small className="text-muted">⏳ Mengecek nomor...</small>
                )}

                {numberStatus === "used" && (
                    <small className="text-danger">❌ Nomor sudah digunakan</small>
                )}

                {numberStatus === "available" && (
                    <small className="text-success">✅ Nomor tersedia</small>
                )}

                {/* VALIDASI BACKEND */}
                {errors?.number && (
                    <small className="text-danger">{errors.number[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="is_negative" className="form-label">Nilai Negatif</label>
                <Select
                    id="is_negative"
                    name="is_negative"
                    placeholder="Pilih"
                    options={isOptions}
                    value={isOptions.find((opt) => opt.value === formData.is_negative) || null}
                    onChange={(selected) => handleChange({ target: { name: "is_negative", value: selected?.value } })}
                    isSearchable={false}
                    className="form-control"
                    classNamePrefix="react-select"
                />
                {errors?.is_negative && (
                    <small className="text-danger">{errors.is_negative[0]}</small>
                )}
            </div>
            <div className="col-span-6 sm:col-span-12">
                <label htmlFor="question" className="form-label">Question</label>
                <textarea
                    name="question"
                    id="question"
                    className="form-control"
                    value={formData.question || ""}
                    onChange={handleChange}
                    required
                />
                {errors?.question && (
                    <small className="text-danger">{errors.question[0]}</small>
                )}
            </div>
        </>
    )
}
