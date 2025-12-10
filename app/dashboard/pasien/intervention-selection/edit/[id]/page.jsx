'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import EditIntervention from '@/components/cms/pages/pasient/intervention/EditIntervention';

export default function EditInterventionPage() {
    const { id } = useParams();
    return <EditIntervention id={id} />
}

