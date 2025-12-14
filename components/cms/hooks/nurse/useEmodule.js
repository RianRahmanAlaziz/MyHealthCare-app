'use client'

import { useState, useEffect } from 'react'
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export default function useEmodule(emodul = null) {
    const router = useRouter();
    const [emodule, setEmodule] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [errors, setErrors] = useState({})
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [editId, setEditId] = useState(emodul);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });
    const [formData, setFormData] = useState({
        name: "",
        icon: "",
        content: "",
    });
    const iconOptions = [
        { value: "Activity", label: "Activity" },
        { value: "Wind", label: "Wind" },
        { value: "Heart", label: "Heart" },
        { value: "Shield", label: "Shield" },
        { value: "Brain", label: "Brain" },
    ];
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });
    const fetchEmodule = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/e-modul?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setEmodule(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data E Module:", error);
            toast.error("Gagal mengambil data E Module 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchEmodule(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchEmodule(page, searchTerm);
    };

    const handleEdit = (item) => {
        console.log('handleEdit called for:', item?.id)
        try {
            setIsEdit(true)
            setEditId(item.id)

            setFormData({
                name: item.name ?? '',
                icon: item.icon ?? '',
                content: item.content ?? '',
            })

            setSelectedIcon(iconOptions.find(i => i.value === item.icon) ?? null)

        } catch (err) {
            console.error('handleEdit error', err)
        }
    };

    const buildPayload = (data, file = null, isEdit = false) => {
        const payload = new FormData();

        payload.append("name", data.name);
        payload.append("icon", data.icon);
        payload.append("content", data.content);


        if (isEdit) payload.append("_method", "PUT");

        return payload;
    };

    const handleSaveEmodul = async (file = null) => {
        try {
            const payload = buildPayload(formData, file, false);

            await axiosInstance.post("/e-modul", payload);

            await fetchEmodule();

            router.push("/dashboard/nurse/e-module");
            toast.success("E Modul berhasil ditambahkan ✅");
        } catch (error) {
            console.log("🔥 FULL ERROR:", error);
            console.log("🔥 ERROR MESSAGE:", error.message);
            console.log("🔥 ERROR RESPONSE:", error.response);
            console.log("🔥 ERROR REQUEST:", error.request);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error("Gagal menambahkan E Modul 🚫");
            }
        }
    };

    const fetchEmodulById = async (id) => {
        if (!id) return;

        try {
            setLoading(true);

            const res = await axiosInstance.get(`/e-modul/${id}`);
            const item = res.data.data;

            setFormData({
                name: item.name,
                icon: item.icon,
                content: item.content,
            });

            setSelectedIcon(
                iconOptions.find((opt) => opt.value === item.icon) || null
            );

        } catch (err) {
            toast.error("Gagal mengambil data E Module!");
        } finally {
            setLoading(false);
        }
    };

    // Auto fetch ketika ID berubah
    useEffect(() => {
        if (emodul) fetchEmodulById(emodul);
    }, [emodul]);

    const handleUpdateEmodule = async (file = null) => {
        try {
            const payload = buildPayload(formData, file, true);

            await axiosInstance.post(`/e-modul/${editId}`, payload);

            await fetchEmodule();

            router.push("/dashboard/nurse/e-module");
            toast.success("E Module berhasil diperbarui ✅");
        } catch (error) {
            console.error("❌ Error Update:", error.response?.data);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error("Gagal memperbarui E Module ⚠️");
            }
        }
    };

    const handleDeleteEmodule = async () => {
        try {
            const res = await axiosInstance.delete(`/e-modul/${modalDataDelete.id}`);
            console.log("Berhasil menghapus E Module:", res.data);
            await fetchEmodule(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("E Module berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus E Module:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus E Module ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (emodul) => {
        setModalDataDelete({
            id: emodul.id,
        });
        setIsOpenDelete(true);
    };


    return {
        iconOptions,
        selectedIcon,
        setSelectedIcon,
        isOpenDelete,
        emodule,
        loading,
        searchTerm,
        setSearchTerm,
        pagination,
        formData,
        setFormData,
        errors,
        setErrors,
        setIsOpenDelete,
        handlePageChange,
        handleSaveEmodul,
        openModalDelete,
        handleDeleteEmodule,
        modalDataDelete,
        isEdit,
        editId,
        handleEdit,
        handleUpdateEmodule,
    };
}
