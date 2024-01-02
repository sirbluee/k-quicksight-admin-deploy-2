'use client'
import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Input, Pagination, Select, SelectItem } from "@nextui-org/react";
import moment from 'moment';
import { BiSearch } from "react-icons/bi";
import { useGetAllVisualizationQuery } from '@/store/features/visualizationFeature/VisualizationFeature';
import { useGetContactUsQuery } from '@/store/features/contact-us/contactUsApiSlice';
import DetailContactUs from './components/DetailContactUs';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Analysis = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const { data: contact_us } = useGetContactUsQuery({ page: page, size: size });



    const handlePageSize = (e) => {
        setSize(e.target.value)
    }

    // Api is not for admin!

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
        <div className={"py-10 pr-20"}>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div>
                <p className={'text-xl font-semibold text-primary-color mb-2'}>Total Contact Us: {contact_us?.count}</p>
                <div className={'grid grid-cols-1'}>
                    <Table>
                        <TableHeader>
                            <TableColumn>EMAIL</TableColumn>
                            <TableColumn>MESSAGE</TableColumn>
                            <TableColumn>READ</TableColumn>
                            <TableColumn>CREATED AT</TableColumn>
                            <TableColumn>ACTION</TableColumn>

                        </TableHeader>
                        <TableBody emptyContent={'No message requested'}>
                            {
                                contact_us?.results.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item?.email}</TableCell>
                                        <TableCell>{TruncateText(item?.message,5)}</TableCell>
                                        <TableCell>{item?.is_read ? 'Read' : 'UnRead'}</TableCell>
                                        <TableCell>{moment(item?.created_at).format("YYYY-MM-DD")}</TableCell>
                                        <TableCell><DetailContactUs item={item} /></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <div className={'my-5 flex gap-5 justify-start items-center'}>
                        <Pagination
                            onChange={setPage}
                            key={'page'} total={contact_us?.pages.length} initialPage={1} color={'primary'} />
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