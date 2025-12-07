'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function usePasien() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [pasien, setPasien] = useState([]);
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

    const fetchPasien = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/pasien?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setPasien(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Pasien:", error);
            toast.error("Gagal mengambil data Pasien 😞");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchPasien(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    // 🔹 navigasi pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchPasien(page, searchTerm);
    };
    // 🔹 Tambah atau edit Departement
    const handleSavePasien = async () => {
        const { mode, editId } = modalData;
        console.log('FINAL FORM DATA:', formData);

        try {
            const url = mode === 'edit' ? `/pasien/${editId}` : '/pasien';
            const method = mode === 'edit' ? 'put' : 'post';
            await axiosInstance({ method, url, data: formData });

            await fetchPasien();
            setIsOpen(false);
            setFormData({ name: '' });
            setErrors({});
            // ✅ Toast notifikasi sukses
            if (mode === 'edit') {
                toast.info("Pasien berhasil diperbarui");
            } else {
                toast.success("Pasien berhasil ditambahkan");
            }
        } catch (error) {
            console.error("❌ Error response:", error.response?.data);

            if (error.response?.status === 422) {
                // ✅ Ambil pesan error validasi dari Laravel
                setErrors(error.response.data.errors || {});
            } else {
                toast.error(mode === 'edit' ? "Gagal memperbarui Pasien ⚠️" : "Gagal menambahkan Pasien 🚫");
            }
        }
    };

    // 🔹 Buka modal Add
    const openAddPasienModal = () => {
        setFormData({ name: '' });
        setErrors({});
        setModalData({ title: 'Add New Pasien', mode: 'add', editId: null });
        setIsOpen(true);
    };

    // 🔹 Buka modal Edit
    const openEditPasienModal = (pasien) => {
        setFormData({
            name: pasien.name || ''
        });
        setErrors({});
        setModalData({ title: 'Edit Pasien', mode: 'edit', editId: pasien.id });
        setIsOpen(true);
    };

    const handleDeletePasien = async () => {
        try {
            const res = await axiosInstance.delete(`/pasien/${modalDataDelete.id}`);
            console.log("Berhasil menghapus Pasien:", res.data);
            await fetchPasien(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Pasien berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus Pasien:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Pasien ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (pasien) => {
        setModalDataDelete({
            title: `Hapus user "${pasien.name}"?`,
            id: pasien.id,
        });
        setIsOpenDelete(true);
    };
    return {
        isOpen,
        isOpenDelete,
        pasien,
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
        handleSavePasien,
        openAddPasienModal,
        openEditPasienModal,
        openModalDelete,
        handleDeletePasien,
    };
}
