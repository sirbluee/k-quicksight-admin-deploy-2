"use client"
import React, {useState} from "react";
import ReactApexChart from "react-apexcharts";

function UserBar (){
    const [state, setState] = useState({
        series: [
            {
                name: 'Numbers',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 67, 67, 67]
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '20%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            title: {
                text: 'Overall User  created Visualization',
                align: 'left',
                style: {
                    fontSize: "16px",
                    color: '#666'
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yaxis: {

            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " Users"
                    }
                }
            }
        },
    });
    return (
        <div className={""}>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
    );
}
export default UserBar;
