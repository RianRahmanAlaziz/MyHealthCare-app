'use client';

import Image from "next/image";
import Link from "next/link";
import { Plus, Share2, Download, MoreVertical, Edit2, Trash, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState, useEffect } from "react";
import useIntervention from "@/components/cms/hooks/patient/useIntervention";
import { useRouter } from "next/navigation";
import Modaldelete from "@/components/cms/common/Modaldelete";

export default function Intervention() {
    const router = useRouter();
    const [openPostMenu, setOpenPostMenu] = useState(null);
    useEffect(() => {
        document.title = "Dashboard | Intervention";
    }, []);
    const {
        loading,
        intervention,
        pagination,
        isOpenDelete,
        setIsOpenDelete,
        handleDeleteIntervention,
        modalDataDelete,
        openModalDelete,
        handleEdit,
    } = useIntervention();
    const onNavigateToAddIntervention = () => {
        router.push("/dashboard/pasien/intervention-selection/create");
    };
    return (
        <>
            <div className="intro-y flex flex-col sm:flex-row items-center pt-24">
                <h2 className="text-lg font-medium mr-auto">
                    Intervention
                </h2>
                <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
                    <button
                        onClick={onNavigateToAddIntervention}
                        className="btn btn-secondary shadow-md mr-2">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                {/* ✅ LOADING STATE */}
                {loading && (
                    <div className="col-span-12 grid grid-cols-12 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="intro-y col-span-12 md:col-span-6 xl:col-span-4 box animate-pulse"
                            >
                                <div className="px-5 py-4 border-b">
                                    <div className="h-4 w-1/2 bg-slate-200 rounded" />
                                </div>

                                <div className="p-5 space-y-4">
                                    <div className="h-40 bg-slate-200 rounded" />
                                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                                    <div className="h-3 bg-slate-200 rounded w-full" />
                                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ✅ DATA KOSONG */}
                {!loading && intervention?.length === 0 && (
                    <div className="col-span-12 text-center py-20">
                        <h3 className="text-lg font-semibold">Data masih kosong</h3>

                    </div>
                )}

                {/* ✅ DATA TAMPIL */}
                {!loading && intervention?.length > 0 && (
                    <>
                        {intervention.map((intervention) => (
                            <div
                                key={intervention.id}
                                className="intro-y col-span-12 md:col-span-6 xl:col-span-4 box"
                            >
                                <div className="flex items-center px-5 py-4 border-b">
                                    <div className="ml-3 mr-auto font-medium">
                                        {intervention.name}
                                    </div>
                                    <div className="relative  ml-3">
                                        <button
                                            onClick={() => setOpenPostMenu(
                                                openPostMenu === intervention.id ? null : intervention.id
                                            )}
                                            className="w-5 h-5 text-slate-500"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                        {openPostMenu === intervention.id && (
                                            <div className="absolute right-0 top-6 z-50 w-40 bg-white dark:bg-darkmode-600 shadow-md rounded-md">
                                                <ul className="py-1">
                                                    <li>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                router.push(`/dashboard/pasien/intervention-selection/edit/${intervention.id}`)
                                                            }}
                                                            className="flex w-full items-center gap-2 px-4 py-2 hover:bg-slate-100"
                                                        >
                                                            <Edit2 className="w-4 h-4" /> Edit Post
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => openModalDelete(intervention)}
                                                            className="flex w-full items-center gap-2 px-4 py-2 hover:bg-slate-100 text-red-500"
                                                        >
                                                            <Trash className="w-4 h-4" /> Delete Post
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="h-40 image-fit">
                                        <Image
                                            src={intervention.image_url}
                                            width={300}
                                            height={300}
                                            alt={intervention.name}
                                            className="rounded-md"
                                        />
                                    </div>

                                    <div className="font-medium text-base mt-5">
                                        {intervention.name}
                                    </div>

                                    <div className="text-slate-600 mt-2">
                                        {intervention.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                <div className="intro-y col-span-12 flex justify-center items-center mt-5">
                    <nav className="w-auto">
                        <ul className="pagination">
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(1)} disabled={pagination.current_page === 1}>
                                    <ChevronsLeft className="w-4 h-4" />
                                </button>

                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(pagination.current_page - 1)} disabled={pagination.current_page === 1}>
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            </li>

                            {[...Array(pagination.last_page)].map((_, i) => (
                                <li key={i} className={`page-item ${pagination.current_page === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}

                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(pagination.current_page + 1)} disabled={pagination.current_page === pagination.last_page}>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={() => handlePageChange(pagination.last_page)} disabled={pagination.current_page === pagination.last_page}>
                                    <ChevronsRight className="w-4 h-4" />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteIntervention}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </>
    )
}
