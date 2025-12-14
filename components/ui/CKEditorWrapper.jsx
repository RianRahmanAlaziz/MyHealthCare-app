'use client';

import dynamic from 'next/dynamic';

const CKEditorClient = dynamic(
    () => import('./CKEditorClient'),
    { ssr: false }
);

export default CKEditorClient;
