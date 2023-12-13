"use client";

import { useRouter } from "next/navigation";
import FormLogin from "./components/Form";
import {ToastContainer} from "react-toastify";

export default function Login() {
    const router = useRouter();
    return (
        <main className="h-screen ">
            {/*<button*/}
            {/*    onClick={() => router.push("/")}*/}
            {/*    title="back to home page"*/}
            {/*    className="text-4xl font-bold text-center m-5"*/}
            {/*>*/}
            {/*    ⬅️ Back*/}
            {/*</button>*/}
            <div>
                <FormLogin />
            </div>
        </main>
    );
}