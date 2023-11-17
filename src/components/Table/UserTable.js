"use client"
import React, { useState } from 'react';
import { Button, Input, Table } from 'antd';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'State',
        dataIndex: 'state',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        render: (_, record) => (
            <div className={"flex flex-wrap gap-2"}>
                <Button className={"bg-blue-600"} type="primary" size="small">Edit</Button>
                <Button className={"bg-red-400"} type="danger" size="small">Delete</Button>
            </div>
        ),
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        state: `Active ${i}`,
        date: `02/12/2023`,
    });
}

const UserTable = () => {
    const [search, setSearch] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        // Filter data based on search term
        // const filteredData = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        // Update data state with filtered data
        // setData(filteredData);
    };

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className={"py-32 px-14 bg-grey-300"}>
            <div
                style={{
                    marginBottom: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Input value={search} onChange={handleSearchChange} placeholder="Search by name" style={{ width: '200px' }} />
                <Button className={"bg-blue-600"} type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};

export default UserTable;
