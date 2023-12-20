"use client"
import React from "react";
import Image from "next/image";
import {useGetAllUserQuery} from "@/store/features/user/userApiSlice";
import {useGetAllVisualizationQuery} from "@/store/features/Visualization/visualization";


export default function SummaryDash() {
    const [totalUsers, setTotalUsers] = React.useState(198000);
    const [createdVisualizations, setCreatedVisualizations] = React.useState(2400);
    const [uploadedData, setUploadedData] = React.useState(89000);

    const {data:allUserTotal} = useGetAllUserQuery();
    const {data:visualization} = useGetAllVisualizationQuery({page: 1, size: 1, title: ''});

    return (
        <>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-10">Summary Dashboard</h2>
                    <div className="grid grid-cols-3 gap-5">
                        <div className="bg-white rounded-lg p-4 shadow-md flex justify-items-center items-center gap-4 hover:animate-appearance-in">
                            <div>
                                <Image width={100} height={100}
                                       src={"/assets/admin-icon/user.svg"} alt="user-icon"/>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-500">Total Users</h3>
                                <div className="text-3xl font-bold text-gray-900">{allUserTotal?.data.count}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md flex justify-items-center items-center gap-4 hover:animate-appearance-in">
                            <div>
                                <Image width={100} height={100}
                                       src={"/assets/admin-icon/bar.svg"} alt="user-icon"/>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-500">Created Visualizations</h3>
                                <div className="text-3xl font-bold text-gray-900">{visualization?.count}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md flex justify-items-center items-center gap-4 hover:animate-appearance-in">
                            <div>
                                <Image width={100} height={100}
                                       src={"/assets/admin-icon/pie.svg"} alt="user-icon"/>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-500">Uploaded Data</h3>
                                <div className="text-3xl font-bold text-gray-900">{uploadedData}</div>
                                <div className="text-sm text-gray-500">↑ 11% this week</div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

// async function getData() {
//     const res = await fetch('')
//     if (!res.ok) {
//         throw new Error('Failed to fetch data')
//     }
//     return res.json()
// }
//
// export default async function Page() {
//     const data = await getData()
//
//     return <main></main>
// }


