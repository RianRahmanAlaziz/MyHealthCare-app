"use client";
import React from 'react'
import Sidelink from '../common/Sidelink'
import { Users, LayoutDashboard, SquareUser, User, FolderKanban, ShieldUser, BookOpenText } from 'lucide-react'

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
                        title="Intervention Selection"
                        href="/dashboard/pasien/intervention-selection"
                        icon={<FolderKanban />}
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
            </ul>
        </nav>
    )
}

export default Sidebar