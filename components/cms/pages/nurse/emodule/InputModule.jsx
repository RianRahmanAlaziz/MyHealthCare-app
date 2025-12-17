'use client'
import Select from "react-select";
import * as LucideIcons from "lucide-react";
import React, { useState, useRef, useEffect } from 'react'
import useEmodule from '@/components/cms/hooks/nurse/useEmodule';
import CKEditor from '@/components/ui/CKEditorWrapper';


export default function InputModule() {

    useEffect(() => {
        document.title = "Dashboard | Add E-Module";
    }, []);
    const {
        formData,
        setFormData,
        errors,
        setErrors,
        handleSaveEmodul,
    } = useEmodule();

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
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
                                    onClick={() => handleSaveEmodul()}
                                    className="btn py-3 btn-primary w-full md:w-52"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >

        </>
    )
}
