'use client'
import React, { useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetDashboardQuery } from "@/store/features/dashboard/dashboardApiSlice";

const UserBar = (timestamp) => {
    const {data:dashboard}=useGetDashboardQuery();

    const [state, setState] = useState({
        series: [{
            name: 'Sales',
            data: [] // This will be populated with the record_count from API response
        }],
        options: {
            // ... other options remain the same
            xaxis: {
                // ... other xaxis options remain the same
                categories: [] // This will be populated with the month_name from API response
            },
            // ... other options remain the same
            title: {
                text: 'Visualize Activity',
                align: 'left',
                style: {
                    fontSize: "16px",
                    color: '#666'
                }
            },
        },
        
    });

    useEffect(() => {
        if (dashboard) {
            const categories = dashboard.visualize_activity.map(item => item.month_name);
            const data = dashboard.visualize_activity.map(item => item.record_count || 0); // Use 0 if record_count is null

            setState(prevState => ({
                ...prevState,
                series: [{ ...prevState.series[0], data }],
                options: {
                    ...prevState.options,
                    xaxis: {
                        ...prevState.options.xaxis,
                        categories
                    }
                }
            }));
        }
    }, [dashboard]);

    

    return (
        <div className={""}>
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
        </div>
    );
};

export default UserBar;
