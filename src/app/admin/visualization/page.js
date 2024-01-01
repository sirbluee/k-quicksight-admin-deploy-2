'use client'
import React, { useState } from 'react';
import { useGetAllAnalysisQuery } from "@/store/features/analysis/Analysis";
import { useGetAllUserQuery, useGetUserQuery } from "@/store/features/user/userApiSlice";
import {useGetRequestTutorialsQuery} from "@/store/features/tutorials/tutorialApiSlice";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {Input, Pagination, Select, SelectItem} from "@nextui-org/react";
import Detail from "@/app/admin/tutorial/Request/[id]/page";
import moment from 'moment';
import {BiSearch} from "react-icons/bi";
import { useGetAllVisualizationQuery } from '@/store/features/Visualization/Visualization';


const Analysis = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [title,setTitle] = useState('')
    const { data: analysis } = useGetAllAnalysisQuery({ page: page, size: size, title: title});
    const { data:visualization } = useGetAllVisualizationQuery({ page: page, size: size, title: title});
    console.log(visualization)



    const handlePageSize = (e) => {
        setSize(e.target.value)
    }

    // Api is not for admin!

    return (
        <div className={'p-10'}>
            <div>
                <p className={'text-xl font-semibold text-primary-color mb-2'}>Total Visualization: {visualization?.count}</p>
                <div className={'flex justify-between items-center'}>
                <Input startContent={<BiSearch />} placeholder={'Search users ...'} onValueChange={setTitle} className={'w-1/3 my-3'}
                       classNames={{
                           inputWrapper: [
                               'rounded-full'
                           ]
                       }}
                       variant={'bordered'} size={'sm'} color={'primary'} />
            </div>
                <div className={'grid grid-cols-1'}>
                    <Table>
                        <TableHeader>
                            <TableColumn>FILE</TableColumn>
                            <TableColumn>TITLE</TableColumn>
                            <TableColumn>CREATE BY</TableColumn>
                            <TableColumn>CREATED AT</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={'No message requested'}>
                            {
                                visualization?.results.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item?.file?.file}</TableCell>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>{item?.created_by?.username}</TableCell>
                                        <TableCell>{moment(item?.created_at).format("YYYY-MM-DD")}</TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div className={'my-5 flex gap-5 justify-start items-center'}>
                        <Pagination
                            onChange={setPage}
                            key={'page'} total={visualization?.pages.length} initialPage={1} color={'primary'} />
                        <Select
                            variant="faded"
                            selectedKeys={[size]}
                            className="max-w-[150px]"
                            onChange={handlePageSize}
                        >
                            <SelectItem key={50} value={50}>
                                50
                            </SelectItem>
                            <SelectItem key={100} value={100}>
                                100
                            </SelectItem>
                            <SelectItem key={150} value={150}>
                                150
                            </SelectItem>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;