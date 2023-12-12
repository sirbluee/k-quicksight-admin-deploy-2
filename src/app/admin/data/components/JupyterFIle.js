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

const JupyterFIle = () => {
    const {data:user} = useGetUserQuery();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadJupyter] = useUploadJupyterMutation();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const {data:jupyter} = useGetJupyterFileQuery({page: currentPage, size: 100, filename: ''});


    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const response = await uploadJupyter({file: file, userId: user?.data.id})
        setSelectedFile(response);
    };
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    console.log(selectedFile)



    return (
        <section className={'p-5'}>
            <div className={'flex justify-between items-center'}>
                <h3 className={'text-primary-color'}>All Jupyter files</h3>
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
                    jupyter?.results.map((item, index) => (
                        <div key={item.id} className={'p-3 rounded-xl shadow-sm border-1 border-gray-200 flex justify-between items-center'}>
                            <div>
                                <p className={'text-lg'} >{item.file}</p>
                                <p>{getTrimIntoColumnOnlyDate(item.created_at)} - {formatBytes(item.size)}</p>
                            </div>
                            <div className={'grid grid-cols-2 gap-2 items-center'}>
                                <DeleteModal fileId={item.id} filename={item.file} />
                                <Button onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_TEMPLATE_JUPYTER}${item.filename}/`)} size={'sm'} variant={'ghost'} color={'primary'}>View detail</Button>
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

export default JupyterFIle;