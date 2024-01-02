'use client'

import React, {useState} from 'react';
import {useGetRequestTutorialsQuery} from "@/store/features/tutorials/tutorialApiSlice";
import Link from "next/link";
import {Input, Pagination, Select, SelectItem} from "@nextui-org/react";
import Detail from "@/app/admin/tutorial/Request/[id]/page";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {BiSearch} from "react-icons/bi";
import ModalAddNew from "@/app/admin/tutorial/components/ModalAddNew";

const RequestTutorial = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(50);
    const [title, setTitle] = useState('')
    const {data:requestTutorial} = useGetRequestTutorialsQuery({size: size, page: page,title:title});


    const handlePageSize = (e) => {
        setSize(e.target.value)
    }


    return (
        <div>
            <p className={'text-xl font-semibold text-primary-color mb-2'}>Total Request Tutorial: {requestTutorial?.count}</p>
            <div className="rounded-2xl flex items-center justify-between w-full mb-5 ">
                <Input startContent={<BiSearch />} placeholder={'Search Request Tutorial ...'} value={title} onValueChange={setTitle} className={'w-1/3 my-3'}
                       classNames={{
                           inputWrapper: [
                               'rounded-3xl'
                           ]
                       }}
                       variant={'bordered'} size={'sm'} color={'primary'} />
            </div>

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