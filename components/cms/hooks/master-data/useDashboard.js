'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useDashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalpasient, setTotalpasient] = useState(0);
    const [totalperawat, setTotalperawat] = useState(0);
    const [totalmodul, setTotalmodul] = useState(0);
    const [totalintervetion, setTotalintervetion] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchCountUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/count-user`);
            setTotalUsers(res.data.total);

        } catch (error) {
            console.error("Gagal mengambil Jumlah user:", error);
            toast.error("Gagal mengambil Jumlah user 😞");
        } finally {
            setLoading(false);
        }
    };

    const fetchCountPerawat = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/count-perawat`);
            setTotalperawat(res.data.total);

        } catch (error) {
            console.error("Gagal mengambil Jumlah Perawat:", error);
            toast.error("Gagal mengambil Jumlah Perawat 😞");
        } finally {
            setLoading(false);
        }
    };
    const fetchCountPasien = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/count-pasien`);
            setTotalpasient(res.data.total);

        } catch (error) {
            console.error("Gagal mengambil Jumlah Pasien:", error);
            toast.error("Gagal mengambil Jumlah Pasien 😞");
        } finally {
            setLoading(false);
        }
    };
    const fetchCountModul = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/count-modul`);
            setTotalmodul(res.data.total);

        } catch (error) {
            console.error("Gagal mengambil Jumlah Modul:", error);
            toast.error("Gagal mengambil Jumlah Modul 😞");
        } finally {
            setLoading(false);
        }
    };
    const fetchCountIntervetion = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(`/count-intervention`);
            setTotalintervetion(res.data.total);

        } catch (error) {
            console.error("Gagal mengambil Jumlah Intervetion:", error);
            toast.error("Gagal mengambil Jumlah Intervetion 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountPerawat();
        fetchCountPasien();
        fetchCountModul();
        fetchCountUsers();
        fetchCountIntervetion();
    }, []);

    return {
        totalUsers,
        totalpasient,
        totalperawat,
        totalmodul,
        totalintervetion,
        loading,
    };
}
