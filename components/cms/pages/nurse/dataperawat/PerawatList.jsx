'use client';
import { useEffect } from 'react'
import { motion } from "framer-motion";
import { Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight, LoaderCircle } from 'lucide-react'
import Modaldelete from '@/components/cms/common/Modaldelete';
import usePerawat from '../../../hooks/nurse/usePerawat';

function PerawatList() {
    useEffect(() => {
        document.title = "Dashboard | Perawat Management";
    }, []);

    const {
        isOpen,
        isOpenDelete,
        perawat,
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
        handleSavePerawat,
        openAddPerawatModal,
        openEditPerawatModal,
        openModalDelete,
        handleDeletePerawat,
    } = usePerawat();
    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-24">
                Perawat Management
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    {/* <button
                        onClick={openAddPasienModal}
                        className="btn btn-secondary shadow-md mr-2">
                        <UserPlus className='pr-1.5' /> Pasien
                    </button> */}

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
                                <th className="text-center whitespace-nowrap">NAME</th>
                                <th className="text-center whitespace-nowrap">NIP</th>
                                <th className="text-center whitespace-nowrap">USIA</th>
                                <th className="text-center whitespace-nowrap">GENDER</th>
                                <th className="text-center whitespace-nowrap">WORK DURATION</th>
                                <th className="text-center whitespace-nowrap">EDUCATION</th>
                                <th className="text-center whitespace-nowrap">UNIT</th>
                                <th className="text-center whitespace-nowrap">SHIFT</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="9" className="py-6">
                                        <div className="flex justify-center items-center">
                                            <LoaderCircle className="w-6 h-6 animate-spin text-gray-500" />
                                        </div>
                                    </td>
                                </tr>
                            ) : perawat.length > 0 ? (
                                [...perawat]
                                    .filter((perawat) =>
                                        perawat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        perawat.email.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                                    .map((perawat, index) => (
                                        <motion.tr key={perawat.id} whileHover={{ scale: 1.02 }}>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.name}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.nip}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.usia}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.gender}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.workDuration}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.education}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.unit}
                                                </div>
                                            </td>
                                            <td className="w-40">
                                                <div className="flex items-center justify-center ">
                                                    {perawat.shift}
                                                </div>
                                            </td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    {/* <button
                                                        onClick={() => openEditperawatModal(perawat)}
                                                        className="flex items-center mr-3"
                                                    >
                                                        <CheckSquare className="w-4 h-4 mr-1" /> Edit
                                                    </button> */}
                                                    <button
                                                        onClick={() => openModalDelete(perawat)}
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
                                    <td colSpan="9" className="text-center py-4">Tidak ada data Pasien</td>
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
            {/* <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
                onSave={handleSavePerawat}
            >
                <InputPerawat formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            </Modal> */}

            <Modaldelete
                isOpenDelete={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
                onDelete={handleDeletePerawat}
                title={modalDataDelete.title}
            >
                {modalDataDelete.content}
            </Modaldelete>
        </>
    )
}

export default PerawatList