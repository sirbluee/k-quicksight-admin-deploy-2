import React from 'react';
import Tab_Data from "@/app/admin/data/components/Tab";
import jupyter from '@assets/images/Project_66-02.jpg'
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Data = () => {
    return (
        <div className={"py-10 pr-20"}>
            {/*<div className={'w-full grid grid-cols-2 justify-between items-center'}>*/}
            {/*    <div>*/}
            {/*        <h3 className={'text-primary-color'}>Data files</h3>*/}
            {/*        <p className={'mt-2 text-description-color'}>All data file must be list and show on detail of each sample side for user to visit and enjoy the new environment of the k-quicksigth.</p>*/}
            {/*    </div>*/}
            {/*    <Image src={jupyter} alt={'file'} />*/}
            {/*</div>*/}
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
            <Tab_Data />
        </div>
    );
};

export default Data;