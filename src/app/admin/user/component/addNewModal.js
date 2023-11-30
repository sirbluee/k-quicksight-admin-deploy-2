import React, {useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input, SelectItem
} from "@nextui-org/react";
import {FaCirclePlus} from "react-icons/fa6";
import { Radio, Select, Space } from 'antd';
import {useCreateUserMutation} from "@/store/features/user/userApiSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AddNewModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [userRolse, setUserRoles] = useState([])
    const roles = [{value: 1, label: 'Admin'}, {value: 2, label: 'Subscriber'}];
    const [error, setError] = useState([])

    const [addNewData] = useCreateUserMutation();

    const handleChange = (value) => {
       setUserRoles(value)
    };



    const handleSelectGender = (value) => {
        setGender(value)
    }

    const addNewUser = async () => {
        let data = {
            username,
            gender,
            email,
            password,
            roles: userRolse
        }
        const response = await addNewData({data: data})
        setError(response?.error?.data?.errors)
        if (response?.error?.status === 400) {
            toast.error(`Invalid field, ${error?.invalid}`)
        } else {
            toast.success("A user has been created")
            setTimeout(() => {
                onOpenChange(false)
            }, 1500)
        }
    }

    return (
        <>
            <Button onPress={onOpen}><FaCirclePlus /> Add new</Button>
            <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add new user</ModalHeader>
                            <ModalBody>
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
                                <div className={'flex justify-center flex-col gap-3 items-center w-full'}>
                                    <div className={'w-2/3'}>
                                        <Input size={'sm'} className={'w-full'} variant={'bordered'} color={'primary'} placeholder={'Username'} type={'text'}
                                               classNames={{
                                                   inputWrapper: [
                                                       'rounded-2xl'
                                                   ]
                                               }}
                                               value={username}
                                               onValueChange={setUsername}
                                        />
                                        <p className={'text-red-500 font-medium'}>{error?.username}</p>
                                    </div>
                                    <div className={'w-2/3'}>
                                        <Input size={'sm'} className={'w-full'} variant={'bordered'} color={'primary'} placeholder={'Email'} type={'Email'}
                                               classNames={{
                                                   inputWrapper: [
                                                       'rounded-2xl'
                                                   ]
                                               }}
                                               value={email}
                                               onValueChange={setEmail}
                                        />
                                        <p className={'text-red-500 font-medium'}>{error?.email}</p>
                                    </div>
                                    <div className={'w-2/3'}>
                                        <Input size={'sm'} className={'w-full'} variant={'bordered'} color={'primary'} placeholder={'Password'} type={'text'}
                                               classNames={{
                                                   inputWrapper: [
                                                       'rounded-2xl'
                                                   ]
                                               }}
                                               value={password}
                                               onValueChange={setPassword}
                                        />
                                        <p className={'text-red-500 font-medium'}>{error?.password}</p>
                                    </div>
                                    <div className={'w-2/3 flex gap-5 justify-between'}>
                                        <p className={'text-sm w-1/2'}>Select user gender: </p>
                                        <div className={'w-full'}>
                                            <Select
                                                style={{
                                                    width: "100%",
                                                }}
                                                onChange={handleSelectGender}
                                                placeholder="Please select user gender"
                                                options={[
                                                    {
                                                        value: 'Male',
                                                        label: 'Male',
                                                    },
                                                    {
                                                        value: 'Female',
                                                        label: 'Female',
                                                    },
                                                    {
                                                        value: 'Other',
                                                        label: 'Other',
                                                    },
                                                ]}
                                            />
                                            <p className={'text-red-500 font-medium'}>{error?.gender}</p>
                                        </div>

                                    </div>
                                    <div className={'w-2/3 flex gap-5 justify-between'}>
                                        <p className={'text-sm w-1/2'}>Select user roles: </p>
                                        <div className={'w-full'}>
                                            <Select
                                                mode="tags"
                                                placeholder="Please select your roles"
                                                onChange={handleChange}
                                                style={{
                                                    width: '100%',
                                                }}
                                                options={roles}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onClick={addNewUser}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
