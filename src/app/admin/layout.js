'use client'
import {Inter} from 'next/font/google'
const inter = Inter({subsets: ['latin']})
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import {Button, Spinner} from "@nextui-org/react";
import Image from "next/image";
import authentication from "@assets/New folder/authentication.png";
import {useRouter} from "next/navigation";

export const metadata = {
    title: 'k-quicksight',
    description: 'Analyze your data!',
}
export default function DashboardRootLayout({children}) {

    const {data:user, isLoading} = useGetUserQuery();
    const router = useRouter();

    let content = null;

    if (isLoading) {
        content = <div className={'pl-[15%] py-24 pr-[5%] flex justify-center items-center min-h-screen'}>
            <Spinner size={'lg'} />
        </div>
    } else if (!user) {
        content = <>
            <div className={'flex justify-center flex-col items-center min-h-screen'}>
                <Image src={authentication} alt={'authentication image'} />
                <p className={'text-2xl font-semibold text-primary-color'}>Ooop! you does not have permission for admin</p>
                <Button onClick={() => router.push('/auth/login')} size={'md'} variant={'bordered'} color={'primary'} className={'my-5'}>Login</Button>
            </div>
        </>
    } else {
        content = (
            <section className={'pl-[15%] py-24 pr-[5%]'}>
                {children}
            </section>
        )
    }
    return content;
}
