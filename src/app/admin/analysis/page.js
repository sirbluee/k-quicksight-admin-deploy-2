'use client'
import React, {useState} from 'react';
import {useGetAllAnalysisQuery} from "@/store/features/analysis/Analysis";
import {useGetAllUserQuery, useGetUserQuery} from "@/store/features/user/userApiSlice";
import {
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {FaSearch} from "react-icons/fa";
import {analysis} from "@/app/mockData/Analysis";
import Edit from "@/app/admin/analysis/component/Edit";
import Delete from "@/app/admin/analysis/component/Delete";
import {Select} from "antd";
import {getTrimIntoColumnOnlyDate} from "@/utils/generateURL";

export const sizeData = [
    {
        id: 1,
        value: '50',
        label: 50
    },
    {
        id: 2,
        value: '100',
        label: 100
    },
    {
        id: 3,
        value: '200',
        label: 200
    },
    {
        id: 4,
        value: '',
        label: 'All'
    }
]

const Analysis = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [value, setValue] = useState(50);
    const [title, setTitle] = useState('')
    const {data:AllAnalysis} = useGetAllAnalysisQuery({page: currentPage, size: value, title: title});

    // Api is not for admin!
    const handleSelectionChange = (e) => {
        setValue(e);
    };

    return (
        <div className={'p-10'}>
            <h2 className={'text-secondary-color'}>Analysis</h2>
            <Input
                endContent={<FaSearch className={'text-secondary-color'} />}
                color={'secondary'}
                radius={'lg'}
                variant={'bordered'}
                className={'my-5 w-1/2'}
                size={'sm'}
                placeholder={'search analysis'}
                value={title}
                onValueChange={setTitle}
            />

            <Table classNames={{
                base: "max-h-[520px] overflow-scroll",
                table: "min-h-[420px]",
            }}>
                <TableHeader>
                    <TableColumn>N.o</TableColumn>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>CREATE AT</TableColumn>
                    <TableColumn>FILE</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No analysis'}>
                    {
                        AllAnalysis?.results.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.model_name}</TableCell>
                                <TableCell>{getTrimIntoColumnOnlyDate(item.created_at)}</TableCell>
                                <TableCell>{item.file.file}</TableCell>
                                <TableCell className={'flex gap-5'}>
                                    {/*<Edit />*/}
                                    <Delete />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className={'flex gap-5 justify-center items-center'}>
                <Pagination
                    page={currentPage}
                    onChange={setCurrentPage}
                    className={'my-5'} total={AllAnalysis?.pages.length} initialPage={1} />
                <Select
                    size={'large'}
                    defaultValue="50"
                    style={{
                        width: 120,
                    }}
                    onChange={handleSelectionChange}
                    options={sizeData}
                />
            </div>
        </div>
    );
};

export default Analysis;