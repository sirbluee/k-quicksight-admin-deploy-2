'use client'

import React, {useRef, useState} from 'react';
import {Button, Pagination} from "@nextui-org/react";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {
    useGetJupyterFileQuery,
    useUploadJupyterMutation
} from "@/store/features/data/Jupyter";
import {getTrimIntoColumnOnlyDate} from "@/utils/generateURL";
import {formatBytes} from "@/utils/sizeGenerate";
import Link from "next/link";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import DeleteModal from "@/app/admin/data/components/deleteModal";
import {useRouter} from "next/navigation";
import {useGetSampleDatasetQuery} from "@/store/features/sample/sampleApiSlice";
import DeleteModalSampleDataset from './DeleteModalSampleDataset';

import { useUploadSampleDatasetMutation } from '@/store/features/sample/sampleApiSlice';
import ViewDetailSampleDataset from './ViewDetailModalSampleDataset';
import { toast } from 'react-toastify';
const SampleDataset = () => {
    const {data:user} = useGetUserQuery();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadSampleDataset] = useUploadSampleDatasetMutation();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const {data:jupyter} = useGetJupyterFileQuery({page: currentPage, size: 100, filename: ''});
    const {data:sample} = useGetSampleDatasetQuery({page: currentPage, size: 100, title: ''});

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const response = await uploadSampleDataset({file: file, userId: user?.data.id})
        toast.success("Upload Sample Dataset Successfully")

        setSelectedFile(response);
    };
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    console.log(selectedFile)



    return (
        <section className={'p-5'}>
            <div className={'flex justify-between items-center'}>
                <p className={'text-xl font-semibold text-primary-color mb-2'}>Total Sample Dataset: {sample?.count}</p>
                <div>
                    <input
                        id="input-jupyter"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />
                    <label htmlFor="input-jupyter">
                        <Button className={'bg-primary-color text-white'} onClick={handleButtonClick}>
                            <AiOutlinePlusCircle /> Add new
                        </Button>
                    </label>
                </div>
            </div>
            <div className={'grid gap-2 mt-3'}>
                {
                    sample?.results.map((item, index) => (
                        <div key={item.id} className={'p-3 rounded-xl shadow-sm border-1 border-gray-200 flex justify-between items-center'}>
                            <div>
                                <p className={'text-lg'} >{item.file}</p>
                                <p>{getTrimIntoColumnOnlyDate(item.created_at)} - {formatBytes(item.size)}</p>
                            </div>
                            <div className={'grid grid-cols-2 gap-2 items-center'}>
                                <DeleteModalSampleDataset fileId={item.id} filename={item.file} />
                                {/* <Button onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_TEMPLATE_JUPYTER}${item.filename}/`)} size={'sm'} variant={'ghost'} color={'primary'}>View detail</Button> */}
                                <ViewDetailSampleDataset uuid={item?.uuid} />
                            </div>
                        </div>
                    ))
                }
                <Pagination
                    total={jupyter?.pages.length}
                    color="primary"
                    initialPage={1}
                    page={currentPage}
                    onChange={setCurrentPage}
                />
            </div>
        </section>
    );
};

export default SampleDataset;