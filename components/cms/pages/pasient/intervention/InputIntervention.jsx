'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Image } from 'lucide-react'
import * as LucideIcons from "lucide-react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

export default function InputIntervention() {
    const [preview, setPreview] = useState(null)
    const [file, setFile] = useState(null)
    const inputRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedBenefits, setSelectedBenefits] = useState([]);


    function handleImageChange(e) {
        const selectedFile = e.target.files[0]
        if (!selectedFile) return

        setFile(selectedFile)
        const previewUrl = URL.createObjectURL(selectedFile)
        setPreview(previewUrl)
    }

    function removePreview() {
        if (preview) URL.revokeObjectURL(preview)
        setPreview(null)
        setFile(null)
        if (inputRef.current) inputRef.current.value = ''
    }

    const durationOptions = [
        { value: 300, label: "5 Menit" },
        { value: 600, label: "10 Menit" },
        { value: 900, label: "15 Menit" },
        { value: 1200, label: "20 Menit" },
    ];

    const iconOptions = [
        { value: "Activity", label: "Activity" },
        { value: "Wind", label: "Wind" },
        { value: "Heart", label: "Heart" },
        { value: "Shield", label: "Shield" },
        { value: "Brain", label: "Brain" },
    ];


    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        duration: null,
        icon: "",
        color: "",
        bgColor: "",
        borderColor: "",
        benefits: "",
        instructions: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (name === "name") {
                return {
                    ...prev,
                    name: value,
                    slug: generateSlug(value), // ✅ AUTO SLUG
                };
            }

            return {
                ...prev,
                [name]: value,
            };
        });
    }


    function handleDurationChange(selected) {
        setSelectedDuration(selected);
        setFormData((prev) => ({
            ...prev,
            duration: selected?.value || null,
        }));
    }

    function generateSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }


    return (
        <>
            <div className="grid grid-cols-12 gap-6 mt-15">
                <div className="col-span-12 2xl:col-span-9">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 mt-8">
                            <div className="intro-y flex items-center h-10">
                                <h2 className="text-lg font-medium truncate mr-5">
                                    Info
                                </h2>
                            </div>
                            <div className="intro-y box p-5 mt-5">
                                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                    <div
                                        className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                        <i data-lucide="chevron-down" className="w-4 h-4 mr-2"></i>Description
                                    </div>
                                    <div className="mt-5">
                                        <div
                                            className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                            <div className="form-label xl:w-64 xl:mr-10!">
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Name</div>
                                                        <div
                                                            className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                            Required</div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Title"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />

                                                {errors.name && (
                                                    <div className="text-danger text-xs mt-1">{errors.name}</div>
                                                )}
                                                <div className="form-help text-right">Maximum character 0/70</div>

                                            </div>
                                        </div>
                                        <div
                                            className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                            <div className="form-label xl:w-64 xl:mr-10!">
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Slug</div>
                                                    </div>
                                                    <div className="leading-relaxed text-slate-500 text-xs mt-3"> Slug adalah bagian
                                                        dari
                                                        URL yang menunjukkan halaman atau konten tertentu di sebuah website
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                                <input
                                                    id="slug"
                                                    name="slug"
                                                    type="text"
                                                    className="form-control"
                                                    value={formData.slug}
                                                    onChange={handleChange}
                                                />

                                                {errors.slug && (
                                                    <div className="text-danger text-xs mt-1">{errors.slug}</div>
                                                )}

                                                <div className="form-help text-right">Maximum character 0/70</div>

                                            </div>
                                        </div>
                                        <div
                                            className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                            <div className="form-label xl:w-64 xl:mr-10!">
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Duration</div>
                                                        <div
                                                            className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                            Required</div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                                <Select
                                                    id="duration"
                                                    name="duration"
                                                    placeholder="-- Pilih Duration --"
                                                    options={durationOptions}
                                                    value={selectedDuration}
                                                    onChange={handleDurationChange}
                                                    classNamePrefix="react-select"
                                                    isSearchable={false}
                                                />

                                                {errors.duration && (
                                                    <div className="text-danger text-xs mt-1">{errors.duration}</div>
                                                )}


                                            </div>
                                        </div>
                                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                            <div className="form-label xl:w-64 xl:mr-10!">
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Icon</div>
                                                        <div
                                                            className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                            Required</div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="w-full mt-3 xl:mt-0 flex-1">
                                                <Select
                                                    id='icon'
                                                    placeholder="Pilih Icon"
                                                    options={iconOptions}
                                                    value={selectedIcon}
                                                    classNamePrefix="react-select"
                                                    onChange={(selected) => {
                                                        setSelectedIcon(selected);
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            icon: selected.value, // ✅ SIMPAN NAMA ICON STRING KE DB
                                                        }));
                                                    }}
                                                    isSearchable
                                                    formatOptionLabel={(option) => {
                                                        const IconComponent = LucideIcons[option.value];

                                                        return (
                                                            <div className="flex items-center gap-2">
                                                                {IconComponent && <IconComponent size={18} />}
                                                                <span>{option.label}</span>
                                                            </div>
                                                        );
                                                    }}
                                                />

                                                {errors.icon && (
                                                    <div className="text-danger text-xs mt-1">{errors.icon}</div>
                                                )}


                                            </div>
                                        </div>
                                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5">
                                            <div className="form-label xl:w-64 xl:mr-10!">
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Benefits</div>
                                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-md">
                                                            Required
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mt-3 xl:mt-0 flex-1">

                                                <CreatableSelect
                                                    isMulti
                                                    placeholder="Ketik lalu Enter..."
                                                    value={selectedBenefits}
                                                    onChange={(selected) => {
                                                        setSelectedBenefits(selected);

                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            benefits: selected.map((item) => item.value),
                                                        }));
                                                    }}
                                                    options={[]}
                                                    isClearable
                                                    isSearchable
                                                    classNamePrefix="react-select"
                                                />

                                                {errors.benefits && (
                                                    <div className="text-danger text-xs mt-1">{errors.benefits}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5">
                                            <div className="form-label xl:w-64 xl:mr-10!">
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Instructions</div>
                                                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded-md">
                                                            Required
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mt-3 xl:mt-0 flex-1">

                                                <CreatableSelect
                                                    isMulti
                                                    placeholder="Ketik lalu Enter..."
                                                    value={selectedBenefits}
                                                    onChange={(selected) => {
                                                        setSelectedBenefits(selected);

                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            benefits: selected.map((item) => item.value),
                                                        }));
                                                    }}
                                                    options={[]}
                                                    isClearable
                                                    isSearchable
                                                    classNamePrefix="react-select"
                                                />

                                                {errors.benefits && (
                                                    <div className="text-danger text-xs mt-1">{errors.benefits}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                                            <div className="form-label xl:w-64 xl:mr-10!">
                                                <div className="text-left">
                                                    <div className="flex items-center">
                                                        <div className="font-medium">Description</div>
                                                        <div
                                                            className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                            Required</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-32 mt-3 xl:mt-0 flex-1">
                                                <textarea
                                                    name="description"
                                                    id="description"
                                                    rows={5}
                                                    className="form-control"
                                                    placeholder="Masukkan deskripsi..."
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center flex-col md:flex-row gap-2 mt-5">
                                <a href="/dashboard/info"
                                    className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52">
                                    Cancel
                                </a>
                                <button
                                    type="button"
                                    className="btn py-3 btn-primary w-full md:w-52"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 2xl:col-span-3">
                    <div className="2xl:border-l -mb-10 pb-10">
                        <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
                            <div className="intro-x col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8">
                                <div className="intro-x flex items-center h-10">
                                    <h2 className="text-lg font-medium truncate mr-5">
                                        Gambar
                                    </h2>
                                </div>
                                <div className="mt-5">
                                    <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                        <div className="col-span-12 sm:col-span-12">
                                            <label className="form-label">Upload Image</label>
                                            <div className="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                                                <div className="flex flex-wrap px-4 cursor-pointer" id="preview-container3">
                                                    {preview && (
                                                        <div className="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                                            <img
                                                                className="rounded-md"
                                                                alt="Preview Image"
                                                                src={preview} />
                                                            <div
                                                                title="Remove this image?"
                                                                className="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2" onClick={removePreview}>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="w-4 h-4 cursor-pointer"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-4 pb-4 flex items-center relative cursor-pointer">

                                                    <Image className="w-4 h-4 mr-2 cursor-pointer" />
                                                    <span className="text-primary mr-1 cursor-pointer">Upload a file</span>
                                                    or drag and
                                                    drop
                                                    <input id="input" name="gambar" type="file" accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="w-full h-full top-0 left-0 absolute opacity-0 cursor-pointer"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
