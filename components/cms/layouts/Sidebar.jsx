"use client";
import React from 'react'
import Sidelink from '../common/Sidelink'
import { Users, LayoutDashboard, UserCog, SquareUser, BriefcaseBusiness, Folders, Building2, FolderKey, MonitorCog, Layers, NotebookText, Weight, User, FolderKanban } from 'lucide-react'

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
                    title="KPI Management"
                    icon={
                        <MonitorCog />
                    }
                >
                    <Sidelink
                        title="Category Management"
                        href="/dashboard/kpi/category-management"
                        icon={<Layers />}
                    />
                    <Sidelink
                        title="Indicator Management"
                        href="/dashboard/kpi/indicator-management"
                        icon={<NotebookText />}
                    />
                    <Sidelink
                        title="Bobot Management"
                        href="/dashboard/kpi/bobot-management"
                        icon={<Weight />}
                    />
                </Sidelink>
            </ul>
        </nav>
    )
}

export default Sidebar