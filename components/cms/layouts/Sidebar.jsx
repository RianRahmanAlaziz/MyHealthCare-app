"use client";
import React from 'react'
import Sidelink from '../common/Sidelink'
import { Users, LayoutDashboard, SquareUser, User, FolderKanban, ShieldUser, BookOpenText, GalleryHorizontalEnd, Building2, BriefcaseBusiness, Blocks, ListCheck, ListChecks } from 'lucide-react'

function Sidebar() {
    return (
        <nav className="side-nav side-nav--simple">
            <ul>
                <Sidelink
                    href="/dashboard"
                    title="Dashboard"
                    icon={
                        <LayoutDashboard />
                    }
                />
                <li className="side-nav__devider my-6"></li>
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
        </nav>
    )
}

export default Sidebar