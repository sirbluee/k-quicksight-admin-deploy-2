'use client'
import React, { useState } from 'react';
import { useGetAllAnalysisQuery } from "@/store/features/analysis/Analysis";
import { useGetAllUserQuery, useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useGetRequestTutorialsQuery } from "@/store/features/tutorials/tutorialApiSlice";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Input, Pagination, Select, SelectItem ,Tooltip} from "@nextui-org/react";
import Detail from "@/app/admin/tutorial/Request/[id]/page";
import moment from 'moment';
import { BiSearch } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";
import ViewDetail from './components/ViewDetail';


const Analysis = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [title, setTitle] = useState('')
    const { data: analysis } = useGetAllAnalysisQuery({ page: page, size: size, title: title });

    console.log(analysis)



    const handlePageSize = (e) => {
        setSize(e.target.value)
    }

    const TruncateText = (text, wordLimit) => {
        text = String(text)
        const words = text.split(' ');

        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        } else {
            return "Not Available";
        }
    }
    return (
        <div className={'p-10'}>
            <div>
                <p className={'text-xl font-semibold text-primary-color mb-2'}>Total Analysis: {analysis?.count}</p>
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
                            <TableColumn>TITLE</TableColumn>
                            <TableColumn>CREATE BY</TableColumn>
                            <TableColumn>MODEL NAME</TableColumn>
                            <TableColumn>RECOMMENDED</TableColumn>
                            <TableColumn>CREATED AT</TableColumn>
                            <TableColumn>Detail</TableColumn>

                        </TableHeader>
                        <TableBody emptyContent={'No message requested'}>
                            {
                                analysis?.results.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item?.title}</TableCell>
                                        <TableCell>{item?.user?.username}</TableCell>
                                        <TableCell>{item?.model_name}</TableCell>
                                        <TableCell>{TruncateText(item?.recommneded, 6)}</TableCell>
                                        <TableCell>{moment(item?.created_at).format("YYYY-MM-DD")}</TableCell>
                                        <TableCell>
                                            <Tooltip content="View Details">
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    {/* <MdRemoveRedEye /> */}
                                                    <ViewDetail recommneded={item?.recommneded} />
                                                </span>
                                            </Tooltip>
                                        </TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div className={'my-5 flex gap-5 justify-start items-center'}>
                        <Pagination
                            onChange={setPage}
                            key={'page'} total={analysis?.pages.length} initialPage={1} color={'primary'} />
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