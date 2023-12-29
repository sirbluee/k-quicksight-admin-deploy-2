'use client'

import React, {useState} from 'react';
import {useGetRequestTutorialsQuery} from "@/store/features/tutorials/tutorialApiSlice";
import Link from "next/link";
import {Input, Pagination, Select, SelectItem} from "@nextui-org/react";
import Detail from "@/app/admin/tutorial/Request/[id]/page";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const RequestTutorial = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(50);

    const {data:requestTutorial} = useGetRequestTutorialsQuery({size: size, page: page})


    const handlePageSize = (e) => {
        setSize(e.target.value)
    }


    return (
        <div>
            <p className={'text-xl font-semibold text-primary-color'}>Total request: {requestTutorial?.count}</p>
            <div className={'grid grid-cols-1'}>
                <Table>
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>SUBJECT</TableColumn>
                        <TableColumn>READ</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={'No message requested'}>
                        {
                            requestTutorial?.results.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item?.request_by.username}</TableCell>
                                    <TableCell>{item?.subject}</TableCell>
                                    <TableCell>{item?.is_read ? 'Read' : 'UnRead'}</TableCell>
                                    <TableCell>
                                        <Detail item={item} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <div className={'my-5 flex gap-5 justify-start items-center'}>
                    <Pagination
                        onChange={setPage}
                        key={'page'} total={requestTutorial?.pages.length} initialPage={1} color={'primary'} />
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
    );
};

export default RequestTutorial;