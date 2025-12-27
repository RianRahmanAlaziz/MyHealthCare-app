'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import InterventionSelection from '@/components/patient/InterventionSelection'
import axiosInstance from '@/lib/axiosInstance';

export default function InterventionSelectionPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Teknik Relaksasi | HealthCare Research";

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axiosInstance.post("/auth/update-last-step", {
                last_step: "intervention-selection"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "intervention-selection";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();
    }, [router]);

    const onSelectIntervention = ({ id, slug }) => {
        router.push(`/patient/intervention-selection/${slug}/education?id=${id}`);
    };

    return (
        <InterventionSelection onSelectIntervention={onSelectIntervention} />
    )
}
