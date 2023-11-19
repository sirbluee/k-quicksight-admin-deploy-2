// pages/index.js
"use client"
import React from "react";
import Image from "next/image";

const SummaryDash = () => {
    const [totalUsers, setTotalUsers] = React.useState(198000);
    const [createdVisualizations, setCreatedVisualizations] = React.useState(2400);
    const [uploadedData, setUploadedData] = React.useState(89000);

    return (
        <>
            <div className="mx-auto">
                <div className="mt-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Summary Dashboard</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="bg-white rounded-lg p-4 shadow-md flex gap-4">
                            <div>
                                <Image width={100} height={100}
                                       src={"/assets/admin-icon/user.svg"} alt="user-icon"/>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-500">Total Users</h3>
                                <div className="text-3xl font-bold text-gray-900">{totalUsers}</div>
                                <div className="text-sm text-gray-500">↑ 37.8% this month</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md flex gap-4">
                            <div>
                                <Image width={100} height={100}
                                       src={"/assets/admin-icon/bar.svg"} alt="user-icon"/>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-500">Created Visualizations</h3>
                                <div className="text-3xl font-bold text-gray-900">{createdVisualizations}</div>
                                <div className="text-sm text-gray-500">↑ 2% this month</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md flex gap-4">
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
            </div>

        </>
    );
};

export default SummaryDash;
