"use client"

import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";
import { setCredentials } from "@/store/features/auth/authSlice";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import admin_login from '@assets/images/admin.jpg'
import {Button, Input} from "@nextui-org/react";
import {IoEyeSharp} from "react-icons/io5";
import {FaEyeSlash} from "react-icons/fa6";


// least 6 characters long, contains at least one uppercase letter, one lowercase letter, and one number
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;


// create a validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            passwordRegex,
            "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
        )
});

export default function FormLogin() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState()
    const [login, { isLoading, isSuccess }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);

    const {
        data: user,
        isLoading: isLoadingGetUser,
        isSuccess: isSuccessGetUser,
        isError,
        error,
    } = useGetUserQuery();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async () => {
        try {
            const { data } = await login({ email, password }).unwrap();
            setAccessToken(data.access)
            dispatch(
                setCredentials(data)
            );

        } catch (error) {
            if (error?.data?.detail) {
                toast.error(error?.data?.detail);
                return;
            }
            if (!error.response) {
                alert("No Server Response");
            } else if (error.response.status === 400) {
                alert("Missing email or password");
            } else if (error.response.status === 403) {
                alert("Forbidden - You don't have permission to access this resource");
            }
        }
    };
    const handleCheckUserRole = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(process.env.NEXT_PUBLIC_BASE_URL + "accounts/me/", requestOptions)
            .then(response => response.json())
            .then(result => {
                const roles = result?.data?.roles;
                if (roles && roles.length > 0) {
                    let redirectTo = null;

                    for (const role of roles) {
                        switch (role.name) {
                            case "admin":
                                redirectTo = "/admin/dashboard";
                                break;
                            case "subscriber":
                                toast.success("Success login");
                                break;
                            // Add more cases for other roles if needed
                            default:
                                toast.error("Unknown role: You don't have permission to access");
                                break;
                        }

                        // If a higher priority role is found, break out of the loop
                        if (redirectTo) {
                            break;
                        }
                    }

                    // Redirect based on the highest priority role
                    if (redirectTo) {
                        router.push(redirectTo);
                    } else {
                        toast.warn("You don't have permission to access");
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    if (isSuccess) {
        handleCheckUserRole()
    }


    const handeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className={'lg:flex md:flex block'}>
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
            <div className={'w-1/2 min-h-screen bg-white flex justify-center items-center'}>
                <Image src={admin_login} alt={'admin-login'} className={'w-2/3 m-auto'} />
            </div>
            <div className={'w-1/2 min-h-screen bg-white flex flex-col justify-center items-center'}>
                <div className={'w-2/3 grid gap-10'}>
                    <div>
                        <h3 className={'text-primary-color uppercase text-center'}>Welcome!</h3>
                        <p className={'text-description-color font-medium text-center'}>Fill your data enter, thank you!</p>
                    </div>
                    <div className={'grid gap-5'}>
                        <Input value={email} onValueChange={setEmail} label={'Admin email'} variant={'underlined'} color={'primary'} isRequired isClearable  onClear={() => setEmail('')} />
                        <Input
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {!isVisible ? (
                                        <IoEyeSharp  className="text-xl pointer-events-none text-primary-color" />
                                    ) : (
                                        <FaEyeSlash className="text-xl pointer-events-none text-primary-color" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            value={password} onValueChange={setPassword} label={'Password'} variant={'underlined'} color={'primary'} isRequired />
                        <Button isLoading={isLoading} className={'mt-5'} variant={'solid'} color={'primary'} onClick={handleSubmit} >Login</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}