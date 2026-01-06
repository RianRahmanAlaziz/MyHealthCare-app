'use client'
import { useState, useRef, useEffect } from 'react'
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";


export default function useIntervention(interventionId = null) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [intervention, setIntervention] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [errors, setErrors] = useState({})
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [editId, setEditId] = useState(interventionId);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(null)
    const [selectedBenefits, setSelectedBenefits] = useState([])
    const [selectedInstructions, setSelectedInstructions] = useState([])
    const [modalDataDelete, setModalDataDelete] = useState({
        title: '',
    });
    const [materials, setMaterials] = useState([
        { title: "", content: "", gambar: null, preview: null }
    ]);

    const handleAddMaterial = () => {
        setMaterials(prev => [
            ...prev,
            { title: "", content: "", gambar: null }
        ]);
    };

    const MAX_SIZE = 2 * 1024 * 1024;
    const handleMaterialImageChange = (index, file) => {
        if (!file) return;
        if (file.size > MAX_SIZE) {
            toast.error("Ukuran gambar maksimal 2 MB");
            return;
        }
        const updated = [...materials];

        // revoke preview lama (hindari memory leak)
        if (updated[index].preview) {
            URL.revokeObjectURL(updated[index].preview);
        }

        updated[index].gambar = file;
        updated[index].preview = URL.createObjectURL(file);
        updated[index].gambar_url = null;

        setMaterials(updated);
    };

    const handleRemoveMaterialImage = (index) => {
        const updated = [...materials];

        if (updated[index].preview) {
            URL.revokeObjectURL(updated[index].preview);
        }

        updated[index].gambar = null;
        updated[index].preview = null;
        updated[index].gambar_url = null;

        setMaterials(updated);
    };


    const handleMaterialChange = (index, field, value) => {
        const updated = [...materials];
        updated[index][field] = value;
        setMaterials(updated);
    };

    const handleRemoveMaterial = (index) => {
        setMaterials((prev) => prev.filter((_, i) => i !== index));
    };


    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        icon: "",
        benefits: [],
        instructions: [],
    })


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
        setLoading(true);

        const timeout = setTimeout(() => {
            fetchIntervention(1, searchTerm);
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
                icon: item.icon ?? '',
                benefits: safeParse(item.benefits),
                instructions: safeParse(item.instructions)
            })

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
        payload.append("icon", data.icon);

        data.benefits.forEach((item, i) => {
            payload.append(`benefits[${i}]`, item);
        });

        data.instructions.forEach((item, i) => {
            payload.append(`instructions[${i}]`, item);
        });

        materials.forEach((item, i) => {
            payload.append(`materials[${i}][title]`, item.title);
            payload.append(`materials[${i}][content]`, item.content);

            if (item.gambar instanceof File) {
                payload.append(`materials[${i}][gambar]`, item.gambar);
            }
        });

        if (file) payload.append("video", file);
        if (isEdit) payload.append("_method", "PUT");


        return payload;
    };

    const handleSaveIntervention = async (file = null) => {
        try {
            setSubmitting(true);

            const payload = buildPayload(formData, file, false);
            const isMaterialsValid = materials.every(
                m => m.title.trim() !== "" && m.content.trim() !== ""
            );

            if (!isMaterialsValid) {
                toast.error("Judul dan konten materi wajib diisi");
                return;
            }
            await axiosInstance.post("/intervention", payload);

            await fetchIntervention();

            router.push("/dashboard/pasien/intervention");
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
        } finally {
            setSubmitting(false);
        }
    };

    const fetchInterventionById = async (id) => {
        if (!id) return;

        try {
            setLoading(true);

            const res = await axiosInstance.get(`/intervention/${id}`);
            const item = res.data.data;
            const titles = safeParse(item.title);
            const contents = safeParse(item.content);
            const gambars = item.gambar ?? [];
            const gambarUrls = item.gambar_url || [];

            setFormData({
                name: item.name,
                slug: item.slug,
                icon: item.icon,
                benefits: safeParse(item.benefits),
                instructions: safeParse(item.instructions),
                video_url: item.video_url
            });

            setSelectedIcon(
                iconOptions.find((opt) => opt.value === item.icon) || null
            );
            setSelectedBenefits(safeParse(item.benefits).map(v => ({ value: v, label: v })));
            setSelectedInstructions(safeParse(item.instructions).map(v => ({ value: v, label: v })));

            if (titles.length && contents.length) {
                setMaterials(
                    titles.map((t, i) => ({

                        title: t,
                        content: contents[i] ?? "",
                        gambar: null,              // file baru (jika upload ulang)
                        preview: null,             // preview dari file baru
                        gambar_url: gambarUrls[i] ?? null // 🔥 gambar lama
                    }))
                );
            } else {
                setMaterials([
                    { title: "", content: "", gambar: null, preview: null, gambar_url: null }
                ]);
            }

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
            setSubmitting(true);

            const payload = buildPayload(formData, file, true);
            const isMaterialsValid = materials.every(
                m => m.title.trim() !== "" && m.content.trim() !== ""
            );

            if (!isMaterialsValid) {
                toast.error("Judul dan konten materi wajib diisi");
                return;
            }
            await axiosInstance.post(`/intervention/${editId}`, payload);

            await fetchIntervention();

            router.push("/dashboard/pasien/intervention");
            toast.success("Intervention berhasil diperbarui ✅");
        } catch (error) {
            console.error("❌ Error Update:", error.response?.data);

            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error("Gagal memperbarui Intervention ⚠️");
            }
        } finally {
            setSubmitting(false);
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
        submitting,
        handleAddMaterial,
        handleMaterialChange,
        materials,
        handleRemoveMaterial,
        handleMaterialImageChange,
        handleRemoveMaterialImage
    };
}
