'use client';
import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import TutorialsTable from "@/components/Table/TutorialsTable";
import { HiDocumentText } from "react-icons/hi";
import RequestTutorial from "@/app/admin/tutorial/Request/Request";

const item = [
    {
        key: '1',
        label: 'Tutorial',
        children: <TutorialsTable />,
    },
    {
        key: '2',
        label: ' Request Tutorial',
        children: <RequestTutorial />,
    }
]

const Tutorial = () => (
    <div className={"py-10 pr-20"}>
        <Tabs
            defaultActiveKey="1"
            items={item}
        />
    </div>
);
export default Tutorial;


