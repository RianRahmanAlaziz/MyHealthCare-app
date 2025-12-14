'use client'

import InterventionSession from '@/components/patient/InterventionSession'
import { useParams, useRouter } from 'next/navigation'

export default function InterventionSessionPage() {
    const { slug } = useParams();
    const [id] = slug.split("-");
    const router = useRouter();

    const onNavigateToSelection = () => {
        router.push(`/patient/intervention-selection`);
    };

    return (
        <InterventionSession id={id} onNavigateToSelection={onNavigateToSelection} />
    )
}
