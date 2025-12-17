"use client";
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from "motion/react"
import React, { useState, useRef, useEffect } from "react";
import { ToggleRight, Heart } from 'lucide-react';
import { useRouter } from "next/navigation";
import axiosInstance from '@/lib/axiosInstance';

function Topbar({ handleLogout }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [openNotif, setOpenNotif] = useState(false);
    const [openAccount, setopenAccount] = useState(false);
    const notifRef = useRef(null);
    const accountRef = useRef(null);

    // Tutup dropdown kalau klik di luar area
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notifRef.current &&
                !notifRef.current.contains(event.target) &&
                accountRef.current &&
                !accountRef.current.contains(event.target)
            ) {
                setOpenNotif(false);
                setopenAccount(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return null;
    return (
        <div className="top-bar-boxed top-bar-boxed--simple-menu h-[70px] md:h-[65px] z-[51] border-b border-white/[0.08] mt-12 md:mt-0 -mx-3 sm:-mx-8 md:-mx-0 px-3 md:border-b-0 relative md:fixed md:inset-x-0 md:top-0 sm:px-8 md:px-10 md:pt-10 md:bg-gradient-to-b md:from-blue-400 md:to-dark-600 dark:md:from-darkmode-700"
        >
            <div className="h-full flex items-center">

                {/* Logo */}
                <Link href="#" className="logo -intro-x hidden md:flex xl:w-[180px] ">
                    <Heart className="w-6 h-6 text-white" />
                </Link>

                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="-intro-x h-[45px] mr-auto">
                    <ol className="breadcrumb breadcrumb-light">
                        <li className="breadcrumb-item"><a href="#">Application</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                    </ol>
                </nav>


                {/* Account Menu */}
                <div className="intro-x dropdown w-8 h-8" ref={accountRef}>
                    <motion.div
                        onClick={() => {
                            setopenAccount((prev) => !prev);
                            setOpenNotif(false); // supaya ga bentrok
                        }}
                        whileTap={{ y: 1 }}
                        className="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110" >
                        <Image
                            alt="User Profile"
                            src="/images/profile-2.jpg"
                            width={32}
                            height={32}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {openAccount && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="w-56 absolute right-0 z-50 mt-5 rounded-md">
                                <ul className=" bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white p-2 rounded-md">
                                    <li className="p-2">
                                        <div className="font-medium capitalize">{user.name}</div>
                                        <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                                            {user.roles?.[0] ?? "User"}
                                        </div>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider border-white/[0.08]" />
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center rounded-md p-2 hover:bg-white/5">
                                            <ToggleRight className="w-4 h-4 mr-2" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </div>
        </div>
    )
}

export default Topbar
