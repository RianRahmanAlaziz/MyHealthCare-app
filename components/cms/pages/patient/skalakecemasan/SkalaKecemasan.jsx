'use client';
import { useEffect } from 'react'
import { motion } from "framer-motion";
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus, LoaderCircle, Eye } from 'lucide-react'
import useSkalaKecemasan from '@/components/cms/hooks/patient/useSkalaKecemasan';

export default function SkalaKecemasan() {
    const {
        assessments,
        loading,
        searchTerm,
        setSearchTerm,
        pagination,
        handlePageChange,
    } = useSkalaKecemasan();

    useEffect(() => {
        document.title = "Dashboard | Hasil Skala Kecemasan";
    }, []);

    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-24">
                Hasil Skala Kecemasan
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <div className="hidden md:block mx-auto text-slate-500"></div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input
                                type="text"
                                className="form-control w-56 box pr-10"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-lucide="search"></i>
                        </div>
                    </div>
                </div>

                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">NAME</th>
                                <th className="text-center whitespace-nowrap">TOTAL SCORE</th>
                                <th className="text-center whitespace-nowrap">HASIL</th>
                                {/* <th className="text-center whitespace-nowrap">ACTIONS</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-6">
                                        <div className="flex justify-center items-center">
                                            <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                                        </div>
                                    </td>
                                </tr>
                            ) : assessments.length > 0 ? (
                                [...assessments]
                                    .filter((assessments) =>
                                        assessments.user.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                    .map((assessments, index) => (
                                        <motion.tr key={assessments.id} whileHover={{ scale: 1.02 }}>
                                            <td>
                                                <span className="font-medium whitespace-nowrap">{assessments.user.name}</span>
                                                <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">{assessments.user.phone}</div>
                                            </td>
                                            <td >
                                                <div className="flex items-center justify-center ">
                                                    {assessments.total_score}
                                                </div>
                                            </td>
                                            <td >
                                                <div className="flex items-center justify-center ">
                                                    {assessments.interpretation}
                                                </div>
                                            </td>
                                            {/* <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        className="flex items-center mr-3"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" /> Show
                                                    </button>
                                                </div>
                                            </td> */}
                                        </motion.tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Tidak ada data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

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

        </>
    )
}
