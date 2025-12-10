'use client'

import InterventionSession from '@/components/patient/InterventionSession'
import { useParams } from 'next/navigation'

export default function InterventionSessionPage() {
    const { id } = useParams();
    return (
        <InterventionSession id={id} />
    )
}
