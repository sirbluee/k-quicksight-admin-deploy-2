"use client"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "@/store/features/auth/authApiSlice";
import {setCredentials} from "@/store/features/auth/authSlice";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {setCurrentUser} from "@/store/features/auth/authSlice";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
    const [login, {isLoading, isSuccess}] = useLoginMutation();
    const {
        data: user,
        isLoading: isLoadingGetUser,
        isSuccess: isSuccessGetUser,
        isError,
        error,
    } = useGetUserQuery();

    const handleSubmit = async ({email, password}) => {
        try {
            const {data} = await login({email, password}).unwrap();
            setAccessToken(data.access)
            dispatch(
                setCredentials(data)
            );
        } catch (error) {
            if (!error.response) {
                alert("No Server Response");
                console.log(error)
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

        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/accounts/me/", requestOptions)
            .then(response => response.json())
            .then(result => {
                const roles = result?.data?.roles;
                if (roles) {
                    for (const role of roles) {
                        switch (role.name) {
                            case "admin":
                                router.push("/admin/dashboard");
                                break;
                            case "subscriber":
                                toast.warn("You don't have permission to access");
                                break;
                            default:
                                toast.warn("Unknown role: You don't have permission to access");
                                break;
                        }
                    }
                } else {
                    toast.error("Unable to determine your roles");
                }


            })
            .catch(error => console.log('error', error));
    }

    if (isLoading)
        return (
            <div className="flex min-h-screen w-1/2  items-center justify-center p-24">
                Loading...
            </div>
        );
    if (isSuccess) {
        handleCheckUserRole()
    }

    return (
        <div className="w-1/2 grid grid-cols-1 place-content-center shadow-md rounded-md p-24">
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
            <h1 className={"text-3xl font-bold text-primary-color mb-10"}>Admin Login</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setTimeout(() => {
                        handleSubmit(values);
                        resetForm();
                    }, 500);
                }}
            >
                {({isSubmitting}) => (
                    <Form className="w-full ">
                        {/* Email */}
                        <div className="relative z-0 w-full mb-6 group">
                            <Field
                                type="email"
                                name="email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email address
                            </label>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        {/* Password */}
                        <div className="relative z-0 w-full mb-6 group">
                            <Field
                                autoComplete="off"
                                type="password"
                                name="password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500"
                            />
                        </div>

                        {/* Submit */}
                        <div className="relative z-0 w-full mb-6 group">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}