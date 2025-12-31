'use client'

import { File } from "lucide-react";
import { useState, useRef, useEffect } from 'react'
import useEmodule from '@/components/cms/hooks/nurse/useEmodule';
import CKEditor from '@/components/ui/CKEditorWrapper';

export default function EditModule({ id }) {
    const [file, setFile] = useState(null);
    const [processingFile, setProcessingFile] = useState(false);
    const inputRef = useRef(null);
    const [existingFile, setExistingFile] = useState(null);
    const [preview, setPreview] = useState(null);



    const {
        loading,
        formData,
        setFormData,
        errors,
        setErrors,
        handleUpdateEmodule
    } = useEmodule(id);

    useEffect(() => {
        document.title = "Dashboard | Edit E-Module";
    }, []);

    useEffect(() => {
        if (!loading && formData?.file_url && !preview) {
            setPreview(formData.file_url);
        }
    }, [loading, formData]);


    if (loading || !formData) {
        return (
            <div className="p-10 text-center">
                <div className="animate-spin h-6 w-6 border-4 border-primary rounded-full border-t-transparent mx-auto mb-3"></div>
                Loading data...
            </div>
        );
    }


    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            toast.error("File harus PDF, DOC, atau DOCX");
            e.target.value = "";
            return;
        }

        setProcessingFile(true);

        setTimeout(() => {
            setFile(selectedFile);
            setPreview(selectedFile.name); // ✅ cukup nama file utk icon
            setProcessingFile(false);
        }, 600);
    }


    function removePreview() {
        setFile(null);
        setPreview(null);

        // tandai ke backend: file lama dihapus
        setFormData(prev => ({
            ...prev,
            file_url: null
        }));

        if (inputRef.current) inputRef.current.value = "";
    }

    return (
        <>
            <div className="grid grid-cols-12 gap-6 mt-15">
                <div className="col-span-12 2xl:col-span-9">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 mt-8">
                            <div className="intro-y flex items-center h-10">
                                <h2 className="text-lg font-medium truncate mr-5">
                                    Tambah  E-Module
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
                                                        <div className="font-medium">Description</div>
                                                        <div
                                                            className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                                                            Required</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-32 mt-3 xl:mt-0 flex-1">
                                                <CKEditor
                                                    value={formData.content}
                                                    onChange={(value) =>
                                                        setFormData({
                                                            ...formData,
                                                            content: value,
                                                        })
                                                    }
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center flex-col md:flex-row gap-2 mt-5">
                                <a href="/dashboard/nurse/e-module"
                                    className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52">
                                    Cancel
                                </a>
                                <button
                                    type="button"
                                    disabled={processingFile}
                                    onClick={() => handleUpdateEmodule(file)}
                                    className="btn py-3 btn-primary w-full md:w-52"
                                >
                                    {processingFile ? "Processing..." : "Save"}
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
                                        File
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
                                                                    <File />
                                                                </div>
                                                            </div>
                                                            <div class="text-slate-500 text-xs text-center mt-0.5">{formData.name}</div>
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
                                                    {processingFile && (
                                                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                                            <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                                            Memproses File...
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="px-4 pb-4 flex items-center relative cursor-pointer">

                                                    <File className="w-4 h-4 mr-2 cursor-pointer" />
                                                    <span className="text-primary mr-1 cursor-pointer">Upload a file</span>
                                                    or drag and
                                                    drop
                                                    <input
                                                        id="input"
                                                        name="file"
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        ref={inputRef}
                                                        disabled={processingFile}
                                                        onChange={handleFileChange}
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
