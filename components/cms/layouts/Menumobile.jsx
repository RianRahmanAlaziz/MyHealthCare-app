'use client'

import Link from 'next/link';
import { Users, LayoutDashboard, SquareUser, User, FolderKanban, ShieldUser, BookOpenText, GalleryHorizontalEnd, Blocks, ListChecks, Heart, Menu, XCircle } from 'lucide-react'
import { useState } from 'react'
import Sidelink from '../common/Sidelink';

function Menumobile() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={`mobile-menu md:hidden ${isOpen ? 'mobile-menu--active' : ''}`}>
            {/* Header bar */}
            <div className="mobile-menu-bar">
                <Link href="/" className="flex mr-auto">
                    <Heart className="w-6 h-auto text-white" />
                </Link>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="mobile-menu-toggler">
                    <Menu className="w-8 h-8 text-white " />
                </button>
            </div>

            {/* Menu content */}
            <div className="scrollable">
                <div className="flex justify-end px-4 py-2">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mobile-menu-toggler"
                    >
                        <XCircle className="w-8 h-8 text-white transform -rotate-90" />
                    </button>
                </div>
                <ul className="scrollable__content py-2">
                    <Sidelink
                        cls="side-menu--active"
                        title="Dashboard"
                        icon={
                            <LayoutDashboard />
                        }
                    />

                    <li className="menu__devider my-6"></li>
                    <Sidelink
                        title="Users Management"
                        href="/dashboard/users"
                        icon={
                            <SquareUser />
                        }
                    />
                    <Sidelink
                        title="Pasient Management"
                        icon={
                            <Users />
                        }
                    >
                        <Sidelink
                            title="Data Pasient"
                            href="/dashboard/pasien/data-pasien"
                            icon={<User />}
                        />
                        <Sidelink
                            title="Intervention"
                            href="/dashboard/pasien/intervention"
                            icon={<FolderKanban />}
                        />
                        <Sidelink
                            title="Hasil Skala Kecemasan"
                            href="/dashboard/pasien/skala-kecemasan"
                            icon={<GalleryHorizontalEnd />}
                        />
                    </Sidelink>
                    <Sidelink
                        title="Perawat Management"
                        icon={
                            <ShieldUser />
                        }
                    >
                        <Sidelink
                            title="Data Perawat"
                            href="/dashboard/nurse/data-perawat"
                            icon={<SquareUser />}
                        />
                        <Sidelink
                            title="E Module Management"
                            href="/dashboard/nurse/e-module"
                            icon={<BookOpenText />}
                        />
                    </Sidelink>
                    <Sidelink
                        title="Master Data"
                        icon={
                            <Blocks />
                        }
                    >
                        <Sidelink
                            title="Question Management"
                            href="/dashboard/master-data/question"
                            icon={<ListChecks />}
                        />
                    </Sidelink>
                </ul>
            </div>
        </div>
    )
}

export default Menumobile