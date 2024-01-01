'use client'

import Image from "next/image";
import { FiBarChart, FiBox, FiDatabase, FiPaperclip, FiUser, FiUsers, FiVideo } from "react-icons/fi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/admin/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { generateBashURL } from "@/utils/generateURL";
import { useEffect } from "react";

export default function SidebarAdmin() {

    const dispatch = useDispatch();
    const pathname = usePathname();
    const { data: user, isLoading, refetch: userRefetch } = useGetUserQuery();
    const router = useRouter();

    useEffect(() => {
        userRefetch();
    }, [userRefetch, user]);


    return (
        <div className={`${pathname.startsWith('/admin') ? '' : 'hidden'} fixed top-0 left-0 z-40 h-screen bg-white shadow-md transition-transform -translate-x-full sm:translate-x-0 p-3 space-y-2 w-56 dark:bg-gray-900 dark:text-gray-100`}>
            <div className="flex items-center p-2 space-x-4">
                <Image unoptimized width={50} height={50} src={generateBashURL(user?.data?.avatar)} alt="amdin profile" className="w-14 h-14 rounded-full object-cover dark:bg-gray-500" />
                <div>
                    <h2 className="text-lg font-semibold">{user?.data.full_name}</h2>
                    <span className="flex items-center space-x-1">
                        <Link rel="noopener noreferrer" href="/admin/profile" className="text-xs hover:underline dark:text-gray-400">View profile</Link>
                    </span>
                </div>
            </div>
            <div className="divide-y dark:divide-gray-700">
                <ul className="pt-2 pb-4 space-y-1 text-lg">
                    <li className="dark:bg-gray-800 dark:text-gray-50">
                        <Link rel="noopener noreferrer" href="/admin/dashboard" className="flex items-center p-2 space-x-3 rounded-md hover:bg-primary-color hover:text-white">
                            <FiBox />
                            <span>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link rel="noopener noreferrer" href="/admin/visualization" className="flex items-center p-2 space-x-3 rounded-md hover:bg-primary-color hover:text-white">
                            <FiBarChart />
                            <span>Visualization</span>
                        </Link>
                    </li>
                    <li>
                        <Link rel="noopener noreferrer" href="/admin/analysis" className="flex items-center p-2 space-x-3 rounded-md hover:bg-primary-color hover:text-white">
                            <FiPaperclip />
                            <span>Analysis</span>
                        </Link>
                    </li>
                    <li>
                        <Link rel="noopener noreferrer" href="/admin/data" className="flex items-center p-2 space-x-3 rounded-md hover:bg-primary-color hover:text-white">
                            <FiDatabase />
                            <span>Data</span>
                        </Link>
                    </li>
                    <li>
                        <Link rel="noopener noreferrer" href="/admin/user" className="flex items-center p-2 space-x-3 rounded-md hover:bg-primary-color hover:text-white">
                            <FiUser />
                            <span>User</span>
                        </Link>
                    </li>
                    <li>
                        <Link rel="noopener noreferrer" href="/admin/tutorial" className="flex items-center p-2 space-x-3 rounded-md hover:bg-primary-color hover:text-white">
                            <FiVideo />
                            <span>Tutorial</span>
                        </Link>
                    </li>
                </ul>
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <li>
                        <button onClick={() => {
                            dispatch(logout());
                            router.push("/auth/login")
                        }} className="flex w-full items-center p-2 space-x-3 rounded-md hover:bg-primary-color hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                <rect width="32" height="64" x="256" y="232"></rect>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}