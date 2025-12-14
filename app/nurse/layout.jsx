import React from 'react'
import "@/style/css/home.css"

export default function NurseLayout({ children }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            {children}
        </div>
    )
}
