'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function usePerawat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [perawat, setPerawat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
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

    const fetchPerawat = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/perawat?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setPerawat(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Perawat:", error);
            toast.error("Gagal mengambil data Perawat 😞");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchPerawat(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchPerawat(page, searchTerm);
    };

    const handleSavePerawat = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url = mode === 'edit' ? `/perawat/${editId}` : '/perawat';
            const method = mode === 'edit' ? 'put' : 'post';
            await axiosInstance({ method, url, data: formData });

            await fetchPerawat();
            setIsOpen(false);
            setFormData({ name: '' });
            setErrors({});
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Perawat berhasil diperbarui");
            } else {
                toast.success("Perawat berhasil ditambahkan");
            }
        } catch (error) {
            console.error("❌ Error response:", error.response?.data);

            if (error.response?.status === 422) {
                // ✅ Ambil pesan error validasi dari Laravel
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(mode === 'edit' ? "Gagal memperbarui Perawat ⚠️" : "Gagal menambahkan Perawat 🚫");
            }
        }
    };

    const openAddPerawatModal = () => {
        setFormData({ name: '' });
        setErrors({});
        setModalData({ title: 'Add New Perawat', mode: 'add', editId: null });
        setIsOpen(true);
    };

    // 🔹 Buka modal Edit
    const openEditPerawatModal = (perawat) => {
        setFormData({
            name: perawat.name || ''
        });
        setErrors({});
        setModalData({ title: 'Edit Perawat', mode: 'edit', editId: perawat.id });
        setIsOpen(true);
    };

    const handleDeletePerawat = async () => {
        try {
            const res = await axiosInstance.delete(`/perawat/${modalDataDelete.id}`);
            console.log("Berhasil menghapus Perawat:", res.data);
            await fetchPerawat(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Perawat berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus Perawat:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Perawat ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (perawat) => {
        setModalDataDelete({
            title: `Hapus user "${perawat.name}"?`,
            id: perawat.id,
        });
        setIsOpenDelete(true);
    };

    return {
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
    };
}
