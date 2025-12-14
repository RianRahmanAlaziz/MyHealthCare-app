'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import EditModule from '@/components/cms/pages/nurse/emodule/EditModule'


export default function EditModulpage() {
    const { id } = useParams();
    return (
        <EditModule id={id} />
    )
}
