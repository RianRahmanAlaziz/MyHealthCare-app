'use client';

import axiosInstance from "@/lib/axiosInstance";
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS

export default function useAssessment() {

    const submitAssessment = async (answers) => {
        const payload = {
            answers: Object.entries(answers).map(([questionId, score]) => ({
                question_id: Number(questionId),
                score,
            })),
        };

        try {
            const res = await axiosInstance.post("/assessments", payload);
            return res.data;
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error("Assessment hari ini sudah diisi");
            }
            throw error;
        }
    };

    return { submitAssessment };
}
