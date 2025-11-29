'use client';

import 'react-toastify/dist/ReactToastify.css';
import "@/style/css/app.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "@/components/cms/layouts/Topbar";
import Sidebar from "@/components/cms/layouts/Sidebar";
import Switcher from "@/components/cms/layouts/Switcher";
import Menumobile from "@/components/cms/layouts/Menumobile";

export default function DashboardLayout({ children }) {

    return (
        <>
            {/* Layout khusus dashboard */}
            <div className="min-h-screen py-5 md:py-5 md:pr-5">
                <Menumobile />
                <Topbar />
                <div className="flex overflow-hidden">
                    <Sidebar />
                    <div className="content">
                        {children}
                    </div>
                </div>
                <Switcher />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
            <div id="modal-root" />
        </>
    );
}
