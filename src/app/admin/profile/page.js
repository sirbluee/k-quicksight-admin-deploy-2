'use client'

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useFileImportMutation, useGetUserQuery, useUpdateUserMutation} from "@/store/features/user/userApiSlice";
import {generateBashURL} from "@/utils/generateURL";
import {Button, Input, Textarea} from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {FaPencilAlt} from "react-icons/fa";

const Profile = () => {

    const {data:user} = useGetUserQuery();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [biography, setBiography] = useState('')
    const [fullname, setFullname] = useState('')
    const [updateUser] = useUpdateUserMutation();
    const [profileImage, setProfileImage] = useState(null);
    const [uploadImage] = useFileImportMutation();
    const handleUpdate = () => {
        const body = {
            full_name: fullname,
            username,
            email,
            phone_number: phone,
            address,
            biography,
            avatar: profileImage,
        }
        try {
            const response = updateUser({userId: user?.data.id, data:body})
            toast.success('Success update!')
        } catch (error){
            if (error.message) {
                toast.error('Cannot update, it has been cancelled')
            }
        }
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        const uploading = await uploadImage({file: formData})
        setProfileImage(uploading?.data.filename);
    };

    useEffect(() => {
        setFullname(user?.data.full_name)
        setUsername(user?.data.username)
        setEmail(user?.data.email)
        setPhone(user?.data.phone_number)
        setAddress(user?.data.address)
        setBiography(user?.data.biography)
        setProfileImage(user?.data.avatar)
    }, [user?.data.address, user?.data.avatar, user?.data.biography, user?.data.email, user?.data.full_name, user?.data.phone_number, user?.data.username]);

    return (
        <div className={'flex flex-col relative justify-center items-center'}>
            <ToastContainer
                position="top-center"
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
            <div className={'flex justify-end items-center w-full'}>
                <Button size={'md'} variant={'solid'} color={'warning'} className={'text-white'} >Change password</Button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className={'relative'}>
                <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={generateBashURL(profileImage)} alt={'profile_image'} className={'w-[150px] h-[150px] object-cover rounded-full'} />
                <label htmlFor="upload-input" className={'absolute hover:bg-secondary-color transition-all cursor-pointer bottom-0 right-0 bg-primary-color p-3 rounded-full'}>
                      <span>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M14.1208 6.96758L15.9168 5.17157L15.9168 5.17156C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71683 15.9168 1.17158L15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64366 4.44469L1.78825 11.3001C1.3558 11.7325 1.13958 11.9488 0.998787 12.215C0.857996 12.4811 0.800957 12.7816 0.686879 13.3824L0.134002 16.2943C0.0731047 16.6151 0.0426559 16.7755 0.134028 16.8687C0.225398 16.962 0.386364 16.9349 0.708293 16.8807H0.708301L3.65659 16.3839C4.28158 16.2786 4.59407 16.2259 4.87112 16.0831C5.14817 15.9402 5.37225 15.7161 5.82041 15.2679L5.82042 15.2679L12.6626 8.42579C11.0409 7.41014 9.6692 6.04785 8.64366 4.44469Z" fill="#ffffff"/>
                        </svg>
                      </span>
                </label>
            </div>
            <h3 className={'py-5'}>{fullname || 'unKnown'}</h3>
            <p className={'text-primary-color font-medium'}>@{username}</p>
            <div className={'w-1/2 flex flex-col gap-3'}>
                <div className={'flex flex-col gap-2'}>
                    <label>Full name</label>
                    <Input type={'text'} variant={"bordered"} size={'sm'} placeholder={'john'} value={fullname} onValueChange={setFullname} className={'w-full bg-gray-50'} />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <label>Email address</label>
                    <Input type={'text'} variant={"bordered"} size={'sm'} placeholder={'example@gmail.com'} value={email} onValueChange={setEmail} className={'w-full bg-gray-50'} />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <label>Phone Number</label>
                    <Input type={'number'} variant={"bordered"} size={'sm'} placeholder={'+855 ... or 0...'} value={phone} onValueChange={setPhone} className={'w-full bg-gray-50'} />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <label>Address</label>
                    <Input type={'text'} variant={"bordered"} size={'sm'} placeholder={'Phnom Penh ...'} value={address} onValueChange={setAddress} className={'w-full bg-gray-50'} />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <label>Bio</label>
                    <Textarea type={'text'} variant={"bordered"} size={'sm'} placeholder={'Your biography'} value={biography} onValueChange={setBiography} className={'w-full bg-gray-50'} />
                </div>
                <div className={'flex justify-end items-center gap-5 mt-10'}>
                    <Button onClick={handleUpdate} size={'md'} variant={'solid'} color={'primary'} >Save</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;