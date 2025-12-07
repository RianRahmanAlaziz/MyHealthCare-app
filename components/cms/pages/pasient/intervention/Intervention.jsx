'use client';

import Image from "next/image";
import Link from "next/link";
import { Plus, Share2, Download, MoreVertical, Edit2, Trash, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

export default function Intervention() {
    const [openMenu, setOpenMenu] = useState(false);
    const [openPostMenu, setOpenPostMenu] = useState(false);
    return (
        <>
            <div className="intro-y flex flex-col sm:flex-row items-center pt-24">
                <h2 className="text-lg font-medium mr-auto">
                    Intervention
                </h2>
                <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
                    <button className="btn btn-secondary shadow-md mr-2">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="intro-y grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 md:col-span-6 xl:col-span-4 box">
                    <div className="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4">
                        <div className="ml-3 mr-auto">
                            <a href="" className="font-medium">Kate Winslet</a>
                        </div>
                        <div className="relative  ml-3">
                            <button
                                onClick={() => setOpenPostMenu(!openPostMenu)}
                                className="w-5 h-5 text-slate-500"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </button>
                            {openPostMenu && (
                                <div className="absolute right-0 top-6 z-50 w-40 bg-white dark:bg-darkmode-600 shadow-md rounded-md">
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                href="#"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100"
                                            >
                                                <Edit2 className="w-4 h-4" /> Edit Post
                                            </Link>
                                        </li>
                                        <li>
                                            <button
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
                        <div className="h-40 2xl:h-56 image-fit">
                            <Image
                                width={300}
                                height={300}
                                alt="Midone - HTML Admin Template" className="rounded-md" src="/images/preview-7.jpg" />
                        </div>
                        <a href="" className="block font-medium text-base mt-5">Dummy text of the printing and typesetting industry</a>
                        <div className="text-slate-600 dark:text-slate-500 mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
                    </div>
                </div>
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    <nav className="w-full sm:w-auto sm:mr-auto">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#"> <i className="w-4 h-4" data-lucide="chevrons-left"></i> </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#"> <i className="w-4 h-4" data-lucide="chevron-left"></i> </a>
                            </li>
                            <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">1</a> </li>
                            <li className="page-item active"> <a className="page-link" href="#">2</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">3</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                            <li className="page-item">
                                <a className="page-link" href="#"> <i className="w-4 h-4" data-lucide="chevron-right"></i> </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#"> <i className="w-4 h-4" data-lucide="chevrons-right"></i> </a>
                            </li>
                        </ul>
                    </nav>
                    <select className="w-20 form-select box mt-3 sm:mt-0">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select>
                </div>
            </div>
        </>
    )
}
