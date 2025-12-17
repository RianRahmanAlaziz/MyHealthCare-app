'use client';

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function useQuestions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get("/questions")
            .then(res => {
                setQuestions(res.data.data);
            })
            .finally(() => setLoading(false));
    }, []);

    return { questions, loading };
}

