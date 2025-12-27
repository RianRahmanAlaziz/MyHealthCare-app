'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useQuestion() {
    const [numberStatus, setNumberStatus] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        number: "",
        question: "",
    });
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const [modalData, setModalData] = useState({
        title: '',
        mode: 'add', // 'add' | 'edit'
        editId: null, // id Permissions kalau edit
    });

    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });

    const fetchQuestion = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/question?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setQuestion(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Question:", error);
            toast.error("Gagal mengambil data Question 😞");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchQuestion(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const fetchNextNumber = async () => {
        setNumberStatus("available");
        try {
            const res = await axiosInstance.get('/question-next-number');
            setFormData(prev => ({
                ...prev,
                number: res.data.next
            }));
        } catch (e) {
            console.error("Gagal ambil next number");
        }
    };


    // 🔹 navigasi pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchQuestion(page, searchTerm);
    };

    const handleSaveQuestion = async () => {
        if (numberStatus === "used") {
            toast.warning("Nomor pertanyaan sudah digunakan");
            return;
        }

        if (numberStatus === "checking") {
            toast.info("Sedang mengecek nomor...");
            return;
        }
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url = mode === 'edit' ? `/question/${editId}` : '/question';
            const method = mode === 'edit' ? 'put' : 'post';
            await axiosInstance({ method, url, data: formData });

            await fetchQuestion();
            setIsOpen(false);
            setFormData({ number: '', question: '', is_negative: '' });
            setErrors({});
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Question berhasil diperbarui");
            } else {
                toast.success("Question berhasil ditambahkan");
            }
        } catch (error) {
            console.error("❌ Error response:", error.response?.data);

            if (error.response?.status === 422) {
                // ✅ Ambil pesan error validasi dari Laravel
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(mode === 'edit' ? "Gagal memperbarui Question ⚠️" : "Gagal menambahkan Question 🚫");
            }
        }
    };

    const openAddQuestionModal = async () => {
        setNumberStatus(null);
        setFormData({ number: '', question: '', is_negative: '', _editId: null });
        setErrors({});
        setModalData({ title: 'Add New Question', mode: 'add', editId: null });
        setIsOpen(true);
        await fetchNextNumber();
    };

    const openEditQuestionModal = (question) => {
        setNumberStatus(null);
        setFormData({
            number: question.number || '',
            question: question.question || '',
            is_negative: question.is_negative ?? '',
            _editId: question.id,
        });
        setErrors({});
        setModalData({ title: 'Edit Question', mode: 'edit', editId: question.id });
        setIsOpen(true);
    };

    const handleDeleteQuestion = async () => {
        try {
            const res = await axiosInstance.delete(`/question/${modalDataDelete.id}`);
            console.log("Berhasil menghapus Question:", res.data);
            await fetchQuestion(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Question berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus Question:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Question ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (question) => {
        setModalDataDelete({
            title: `Hapus `,
            id: question.id,
        });
        setIsOpenDelete(true);
    };

    return {
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
    };
}
