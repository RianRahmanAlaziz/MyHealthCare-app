'use client'
import { useState, useRef, useEffect } from 'react'
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";


export default function useIntervention(interventionId = null) {
    const router = useRouter();
    const [intervention, setIntervention] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [errors, setErrors] = useState({})
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [editId, setEditId] = useState(interventionId);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState(null)
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [selectedBenefits, setSelectedBenefits] = useState([])
    const [selectedInstructions, setSelectedInstructions] = useState([])
    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        duration: null,
        icon: "",
        benefits: [],
        instructions: [],
    })

    const durationOptions = [
        { value: 300, label: "5 Menit" },
        { value: 600, label: "10 Menit" },
        { value: 900, label: "15 Menit" },
        { value: 1200, label: "20 Menit" },
    ];

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


    const fetchIntervention = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/intervention?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setIntervention(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Intervention:", error);
            toast.error("Gagal mengambil data Intervention 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchIntervention(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchIntervention(page, searchTerm);
    };

    const safeParse = (v) => {
        try { return v ? JSON.parse(v) : [] }
        catch (e) { console.error('Safe parse error', e, v); return [] }
    }

    const handleEdit = (item) => {
        console.log('handleEdit called for:', item?.id)
        try {
            setIsEdit(true)
            setEditId(item.id)

            setFormData({
                name: item.name ?? '',
                slug: item.slug ?? '',
                description: item.description ?? '',
                duration: item.duration ?? null,
                icon: item.icon ?? '',
                benefits: safeParse(item.benefits),
                instructions: safeParse(item.instructions)
            })

            setSelectedDuration(durationOptions.find(d => d.value === item.duration) ?? null)
            setSelectedIcon(iconOptions.find(i => i.value === item.icon) ?? null)
            setSelectedBenefits(safeParse(item.benefits))
            setSelectedInstructions(safeParse(item.instructions))

        } catch (err) {
            console.error('handleEdit error', err)
        }
    };

    const buildPayload = (data, file = null, isEdit = false) => {
        const payload = new FormData();

        payload.append("name", data.name);
        payload.append("slug", data.slug);
        payload.append("description", data.description);
        payload.append("duration", data.duration);
        payload.append("icon", data.icon);

        data.benefits.forEach((item, i) => {
            payload.append(`benefits[${i}]`, item);
        });

        data.instructions.forEach((item, i) => {
            payload.append(`instructions[${i}]`, item);
        });

        if (file) payload.append("video", file);
        if (isEdit) payload.append("_method", "PUT");

        return payload;
    };

    const handleSaveIntervention = async (file = null) => {
        try {
            const payload = buildPayload(formData, file, false);

            await axiosInstance.post("/intervention", payload);

            await fetchIntervention();

            router.push("/dashboard/pasien/intervention-selection");
            toast.success("Intervention berhasil ditambahkan ✅");
        } catch (error) {
            console.log("🔥 FULL ERROR:", error);
            console.log("🔥 ERROR MESSAGE:", error.message);
            console.log("🔥 ERROR RESPONSE:", error.response);
            console.log("🔥 ERROR REQUEST:", error.request);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error("Gagal menambahkan Intervention 🚫");
            }
        }
    };

    const fetchInterventionById = async (id) => {
        if (!id) return;

        try {
            setLoading(true);

            const res = await axiosInstance.get(`/intervention/${id}`);
            const item = res.data.data;

            setFormData({
                name: item.name,
                slug: item.slug,
                description: item.description,
                duration: item.duration,
                icon: item.icon,
                benefits: safeParse(item.benefits),
                instructions: safeParse(item.instructions),
                video_url: item.video_url
            });

            setSelectedDuration(
                durationOptions.find((opt) => opt.value === item.duration) || null
            );
            setSelectedIcon(
                iconOptions.find((opt) => opt.value === item.icon) || null
            );
            setSelectedBenefits(safeParse(item.benefits).map(v => ({ value: v, label: v })));
            setSelectedInstructions(safeParse(item.instructions).map(v => ({ value: v, label: v })));


        } catch (err) {
            toast.error("Gagal mengambil data intervention!");
        } finally {
            setLoading(false);
        }
    };

    // Auto fetch ketika ID berubah
    useEffect(() => {
        if (interventionId) fetchInterventionById(interventionId);
    }, [interventionId]);

    const handleUpdateIntervention = async (file = null) => {
        try {
            const payload = buildPayload(formData, file, true);

            await axiosInstance.post(`/intervention/${editId}`, payload);

            await fetchIntervention();

            router.push("/dashboard/pasien/intervention-selection");
            toast.success("Intervention berhasil diperbarui ✅");
        } catch (error) {
            console.error("❌ Error Update:", error.response?.data);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error("Gagal memperbarui Intervention ⚠️");
            }
        }
    };

    const handleDeleteIntervention = async () => {
        try {
            const res = await axiosInstance.delete(`/intervention/${modalDataDelete.id}`);
            console.log("Berhasil menghapus Intervention:", res.data);
            await fetchIntervention(); // refresh data tabel
            setIsOpenDelete(false); // tutup modal
            toast.success("Intervention berhasil dihapus 🗑️");
        } catch (error) {
            setIsOpenDelete(false); // tutup modal
            console.error("Gagal menghapus Intervention:", error.response?.data || error.message);
            // Ambil pesan error dari controller Laravel
            const errorMessage =
                error.response?.data?.message ||
                "Terjadi kesalahan saat menghapus Intervention ❌";

            // Tampilkan di toast
            toast.error(errorMessage);

            // Jika mau, kamu juga bisa tampilkan pesan detail di console untuk debugging:
            if (error.response?.data?.error) {
                console.error("Detail error:", error.response.data.error);
            }
        }
    };

    const openModalDelete = (intervention) => {
        setModalDataDelete({
            id: intervention.id,
        });
        setIsOpenDelete(true);
    };


    return {
        selectedInstructions,
        setSelectedInstructions,
        selectedDuration,
        setSelectedDuration,
        durationOptions,
        iconOptions,
        selectedIcon,
        setSelectedIcon,
        selectedBenefits,
        setSelectedBenefits,
        isOpenDelete,
        intervention,
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
        handleSaveIntervention,
        openModalDelete,
        handleDeleteIntervention,
        modalDataDelete,
        isEdit,
        editId,
        handleEdit,
        handleUpdateIntervention,
    };
}
