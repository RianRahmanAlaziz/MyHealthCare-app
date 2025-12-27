'use client';

import EducationModule from '@/components/patient/EducationModule';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EducationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get("id");

    const onNavigateToIntervention = () => {
        router.push(
            `/patient/intervention-selection/${id}?id=${id}`
        );
    };

    return (
        <EducationModule onNavigateToIntervention={onNavigateToIntervention} />
    );
}
