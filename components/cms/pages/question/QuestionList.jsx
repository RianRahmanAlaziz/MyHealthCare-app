'use client';

import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, UserPlus, LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import Modal from '@/components/cms/common/Modal';
import { motion } from "framer-motion";
import Modaldelete from '@/components/cms/common/Modaldelete';
import useQuestion from '@/components/cms/hooks/master-data/useQuestion';
import InputQuestion from './InputQuestion';

export default function QuestionList() {
    useEffect(() => {
        document.title = "Dashboard | Users Management";
    }, []);

    const {
        isOpen,
        isOpenDelete,
        question,
        loading,
        searchTerm,
        setSearchTerm,
        pagination,
        modalData,
        modalDataDelete,
        formData,
        setFormData,
        errors,
        setErrors,
        setIsOpen,
        setIsOpenDelete,
        handlePageChange,
        handleSaveQuestion,
        openAddQuestionModal,
        openEditQuestionModal,
        handleDeleteQuestion,
        openModalDelete,
        numberStatus,
        setNumberStatus
    } = useQuestion();

    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-24">
                Question Management
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={openAddQuestionModal}
                        className="btn btn-secondary shadow-md mr-2">
                        <UserPlus className='pr-1.5' />  Question
                    </button>

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
                                <th className="text-center whitespace-nowrap">NUMBER</th>
                                <th className="whitespace-nowrap">QUESTION</th>
                                <th className="text-center whitespace-nowrap">NEGATIF</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
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
                            ) : question.length > 0 ? (
                                [...question]
                                    .filter((question) =>
                                        question.question
                                            ?.toLowerCase()
                                            .includes(searchTerm.toLowerCase()) ||
                                        question.number
                                            ?.toString()
                                            .includes(searchTerm)
                                    )
                                    .sort((a, b) => a.number - b.number)
                                    .map((question, index) => (
                                        <motion.tr key={question.id} whileHover={{ scale: 1.02 }}>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {question.number}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="font-medium whitespace-nowrap">{question.question}</span>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center">
                                                    {question.is_negative === 1 ? (
                                                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                                                            true
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                                                            false
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        onClick={() => openEditQuestionModal(question)}
                                                        className="flex items-center mr-3"
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button>
                                                    <button
                                                        onClick={() => openModalDelete(question)}
                                                        className="flex items-center text-danger"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Tidak ada data Question</td>
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

            {/* 🔹 Modal Add/Edit */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSaveQuestion}
            >
                <InputQuestion
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    setErrors={setErrors}
                    numberStatus={numberStatus}
                    setNumberStatus={setNumberStatus} />
            </Modal>

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeleteQuestion}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </>
    )
}
