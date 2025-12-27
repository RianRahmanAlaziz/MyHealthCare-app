'use client'
import React, { useState, useRef, useEffect } from 'react'
import * as LucideIcons from "lucide-react";
import { FileVideoCamera } from 'lucide-react';
import useIntervention from '@/components/cms/hooks/patient/useIntervention';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), {
    ssr: false,
});

const CreatableSelect = dynamic(
    () => import('react-select/creatable'),
    { ssr: false }
);

export default function EditIntervention({ id }) {
    const [preview, setPreview] = useState(null)
    const [file, setFile] = useState(null)
    const [processingVideo, setProcessingVideo] = useState(false);
    const inputRef = useRef(null)
    const {
        loading,
        selectedInstructions,
        setSelectedInstructions,
        selectedDuration,
        setSelectedDuration,
        durationOptions,
        iconOptions,
        selectedIcon,
        setSelectedIcon,
        selectedBenefits,
        setSelectedBenefits,
        formData,
        setFormData,
        errors,
        setErrors,
        handleUpdateIntervention,
        submitting,
        handleAddMaterial,
        handleMaterialChange,
        materials,
        handleRemoveMaterial
    } = useIntervention(id);

    useEffect(() => {
        document.title = "Dashboard | Edit Intervention";
    }, []);


    if (loading || !formData) {
        return (
            <div className="p-10 text-center">
                <div className="animate-spin h-6 w-6 border-4 border-primary rounded-full border-t-transparent mx-auto mb-3"></div>
                Loading data...
            </div>
        );
    }

    function handleImageChange(e) {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setProcessingVideo(true);

        if (preview) URL.revokeObjectURL(preview);

        const videoUrl = URL.createObjectURL(selectedFile);
        const video = document.createElement("video");
        video.src = videoUrl;

        video.onloadedmetadata = () => {
            setFile(selectedFile);
            setPreview(videoUrl);

            // tandai bahwa video lama diganti
            setFormData(prev => ({
                ...prev,
                video: selectedFile
            }));

            setProcessingVideo(false);
        };

        video.onerror = () => {
            alert("Video tidak valid");
            setProcessingVideo(false);
        };
    }



    const removePreview = () => {
        setPreview(null);

        setFormData(prev => ({
            ...prev,
            video: null,
            video_url: null
        }));
    };


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
                                    Edit Intervention
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
                                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
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
                                                    readOnly
                                                    onChange={handleChange}
                                                />

                                                {errors.slug && (
                                                    <div className="text-danger text-xs mt-1">{errors.slug}</div>
                                                )}

                                                <div className="form-help text-right">Maximum character 0/70</div>

                                            </div>
                                        </div>
                                        <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
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
                                                    name='icon'
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
                                                    isSearchable={false}
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
                                                    id='benefits'
                                                    name='benefits'
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
                                                    id='instructions'
                                                    name='instructions'
                                                    isMulti
                                                    placeholder="Ketik lalu Enter..."
                                                    value={selectedInstructions}
                                                    onChange={(selected) => {
                                                        setSelectedInstructions(selected);

                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            instructions: selected.map((item) => item.value),
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
                                    </div>
                                </div>
                            </div>

                            <div className="intro-y box p-5 mt-5">
                                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                                    <div
                                        className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                                        <LucideIcons.ChevronDown className="w-4 h-4 mr-2" />
                                        Materi Intervention
                                    </div>
                                    <div id="formContainer" className="mt-5">
                                        {materials.map((item, index) => (
                                            <div key={index} className="border-b pb-5 mb-5 last:border-0 relative">

                                                {/* TITLE */}
                                                <div className="form-inline items-start flex-col xl:flex-row mt-5">
                                                    <label className="form-label xl:w-64 xl:mr-10!">
                                                        <div className="font-medium">Title</div>
                                                    </label>
                                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Judul materi"
                                                            value={item.title}
                                                            onChange={(e) =>
                                                                handleMaterialChange(index, "title", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {/* CONTENT */}
                                                <div className="form-inline items-start flex-col xl:flex-row mt-5">
                                                    <div className="form-label xl:w-64 xl:mr-10!">
                                                        <div className="font-medium">Content</div>
                                                    </div>
                                                    <div className="w-full mt-3 xl:mt-0 flex-1">
                                                        <textarea
                                                            rows={4}
                                                            className="form-control"
                                                            placeholder="Masukkan Content..."
                                                            value={item.content}
                                                            onChange={(e) =>
                                                                handleMaterialChange(index, "content", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                {/* BUTTON HAPUS */}
                                                {materials.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm absolute top-38 right-0"
                                                        onClick={() => handleRemoveMaterial(index)}
                                                    >
                                                        <LucideIcons.Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    className="btn py-2 px-4 btn-outline-secondary w-full md:w-24 text-xs mt-3"
                                    onClick={handleAddMaterial}
                                >
                                    <LucideIcons.Plus /> Tambah
                                </button>

                            </div>

                            <div className="flex justify-center flex-col md:flex-row gap-2 mt-5">
                                <Link
                                    className={`btn py-3 border-slate-300 dark:border-darkmode-400text-slate-500 w-full md:w-52 ${(processingVideo || submitting) ? "pointer-events-none opacity-50" : ""}`}
                                    href="/dashboard/pasien/intervention">
                                    Cancel
                                </Link>
                                <button
                                    type="button"
                                    disabled={processingVideo || submitting}
                                    onClick={() => handleUpdateIntervention(file)}
                                    className="btn py-3 btn-primary w-full md:w-52"
                                >
                                    {(processingVideo || submitting) && (
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    )}
                                    {processingVideo
                                        ? "Memproses video..."
                                        : submitting
                                            ? "Menyimpan..."
                                            : "Update"}
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
                                        Video
                                    </h2>
                                </div>
                                <div className="mt-5">
                                    <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                        <div className="col-span-12 sm:col-span-12">
                                            <label className="form-label">Upload File</label>
                                            <div className="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                                                <div className="flex flex-wrap px-4 cursor-pointer" id="preview-container3">
                                                    {preview && (
                                                        <div className="file w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                                            <div className="w-3/5 file__icon file__icon--file mx-auto">
                                                                <div className="file__icon__file-name">
                                                                    <FileVideoCamera />
                                                                </div>
                                                            </div>
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
                                                    {!preview && formData?.video_url && (
                                                        <div className="file w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                                            <div className="w-3/5 file__icon file__icon--file mx-auto">
                                                                <div className="file__icon__file-name">
                                                                    <FileVideoCamera />
                                                                </div>
                                                            </div>
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

                                                    <FileVideoCamera className="w-4 h-4 mr-2 cursor-pointer" />
                                                    <span className="text-primary mr-1 cursor-pointer">Upload a file</span>
                                                    or drag and
                                                    drop
                                                    <input id="input" name="video" type="file" accept="video/*"

                                                        disabled={processingVideo || submitting}
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
