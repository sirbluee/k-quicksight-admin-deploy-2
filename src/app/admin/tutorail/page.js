'use client'
import React from 'react'

import DynamicSection from "@/app/admin/tutorail/component/dynamicSections";
import {Tabs} from "antd";

export default function page() {
    const item = [
        {

            label: `add tutorail`,
            key: 1,
            children: <DynamicSection />,
        },
        {

            label: `Receive tutorail`,
            key: 2,
            children: ``,
        }
    ]
  return (
    <>
        <div className='text-primary-color font-medium text-xl mb-5'>Tutorials</div>
        <Tabs
            defaultActiveKey="1"
            type="card"
            size={'large'}
            items={item}
        />

    </>
  )
}
