'use client';
import { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify';

export default function useSkalaKecemasan() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const fetchAssessments = async (page = 1, search = '') => {
        try {
            const res = await axiosInstance.get(`/assessments?page=${page}&search=${search}`);
            const paginated = res.data.data;
            setAssessments(paginated.data);
            setPagination({
                current_page: paginated.current_page,
                last_page: paginated.last_page,
                per_page: paginated.per_page,
                total: paginated.total
            });
        } catch (error) {
            console.error("Gagal mengambil data Assessments:", error);
            toast.error("Gagal mengambil data Assessments 😞");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm.trim() !== '') setLoading(true);
        const timeout = setTimeout(() => {
            fetchAssessments(searchTerm);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.last_page) return;
        setLoading(true);
        fetchAssessments(page, searchTerm);
    };

    return {
        assessments,
        loading,
        searchTerm,
        setSearchTerm,
        pagination,
        handlePageChange,
    };
}
