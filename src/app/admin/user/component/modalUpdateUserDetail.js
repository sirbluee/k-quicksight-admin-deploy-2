'use client'

import React, {useEffect, useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input, Select, SelectItem
} from "@nextui-org/react";
import {FaPencilAlt} from "react-icons/fa";
import {generateBashURL} from "@/utils/generateURL";
import {useUploadSingleMutation} from "@/store/features/uploadFile/uploadImage";
import {useUpdateUserMutation} from "@/store/features/user/userApiSlice";

export default function ModalUpdateUserDetail({userInfo}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [full_name, setFull_name] = useState('');
    const [gender, setGender] = useState(new Set([]))
    const [phone_number, setPhone_number] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [imageUpload] = useUploadSingleMutation();
    const [updateInfo] = useUpdateUserMutation();

    useEffect(() => {
        setFull_name(userInfo?.full_name);
        setGender(userInfo?.gender);
        setPhone_number(userInfo?.phone_number);
        setAddress(userInfo?.address);
        setAvatar(userInfo.avatar);
    }, [userInfo]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0]
        const response = await imageUpload({data: file})
        setAvatar(response?.data?.filename);
        let data = {
            username: userInfo?.username,
            avatar: response?.data?.filename,
        }
        const updateImage = await updateInfo({data:data, userId: userInfo.id})
    }

    const handleUpdateUserInfo = async () => {
        let data = {
            username: userInfo?.username,
            full_name,
            phone_number,
            address,
            gender: gender?.anchorKey
        }
        const updatUserInfo = await updateInfo({data:data, userId: userInfo?.id})
        onOpenChange(false);
    }

    return (
        <>
            <Button size={'sm'} color={'success'} variant={'flat'} onPress={onOpen}>
                <FaPencilAlt />
            </Button>
            <Modal size={'4xl'} isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary-color">Update user information</ModalHeader>
                            <ModalBody>
                                <div className={'flex justify-start items-center flex-col gap-3'}>
                                    <div className={'relative'}>
                                        <input
                                            id="upload-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={generateBashURL(avatar)} alt={'profile_image'} className={'w-[150px] h-[150px] object-cover rounded-full'} />
                                        <label htmlFor="upload-input" className={'absolute hover:bg-secondary-color transition-all cursor-pointer bottom-0 right-0 bg-primary-color p-3 rounded-full'}>
                                              <span>
                                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path fillRule="evenodd" clipRule="evenodd" d="M14.1208 6.96758L15.9168 5.17157L15.9168 5.17156C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71683 15.9168 1.17158L15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64366 4.44469L1.78825 11.3001C1.3558 11.7325 1.13958 11.9488 0.998787 12.215C0.857996 12.4811 0.800957 12.7816 0.686879 13.3824L0.134002 16.2943C0.0731047 16.6151 0.0426559 16.7755 0.134028 16.8687C0.225398 16.962 0.386364 16.9349 0.708293 16.8807H0.708301L3.65659 16.3839C4.28158 16.2786 4.59407 16.2259 4.87112 16.0831C5.14817 15.9402 5.37225 15.7161 5.82041 15.2679L5.82042 15.2679L12.6626 8.42579C11.0409 7.41014 9.6692 6.04785 8.64366 4.44469Z" fill="#ffffff"/>
                                                </svg>
                                              </span>
                                        </label>
                                    </div>
                                    <p className={'text-primary-color font-medium'}>@{userInfo.username}</p>
                                    <p className={'text-primary-color font-semibold'}>{full_name || 'unKnown full name'}</p>
                                </div>
                                <div className={'flex flex-col gap-3 justify-center items-center text-text-color'}>
                                    <div className={'w-2/3'}>
                                        <p>Full-name</p>
                                        <Input size={'sm'} color={'primary'} variant={'bordered'} placeholder={'Full name'} value={full_name} onValueChange={setFull_name} />
                                    </div>
                                    <div className={'w-2/3'}>
                                        <p>Gender</p>
                                        <Select
                                            variant={'bordered'}
                                            size={'sm'}
                                            defaultSelectedKeys={[gender]}
                                            onSelectionChange={setGender}
                                        >
                                            <SelectItem key={'Male'} value={'Male'}>Male</SelectItem>
                                            <SelectItem key={'Female'} value={'Female'}>Female</SelectItem>
                                            <SelectItem key={'Other'} value={'Other'}>Other</SelectItem>
                                        </Select>
                                    </div>
                                    <div className={'w-2/3'}>
                                        <p>Phone number</p>
                                        <Input size={'sm'} color={'primary'} variant={'bordered'} placeholder={'Phone number'} value={phone_number} onValueChange={setPhone_number} />
                                    </div >
                                    <div  className={'w-2/3'}>
                                        <p>Address</p>
                                        <Input size={'sm'} color={'primary'} variant={'bordered'} placeholder={'Address'} value={address} onValueChange={setAddress} />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleUpdateUserInfo} color="primary">
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
