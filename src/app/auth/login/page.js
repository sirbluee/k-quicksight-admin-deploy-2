"use client";

import { useRouter } from "next/navigation";
import FormLogin from "./components/Form";

export default function Login() {
    const router = useRouter();
    return (
        <main className="h-screen ">
            <div className="w-full min-h-screen flex flex-wrap justify-center items-center">
                <FormLogin />
            </div>
        </main>
    );
}