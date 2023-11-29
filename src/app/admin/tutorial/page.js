'use client'
import TutorialTable from "@/components/Table/TutorialsTable";
import {useGetUserQuery} from "@/store/features/user/userApiSlice";
import Image from "next/image";
import authentication from "@assets/images/authentication.png";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
export default function ListUser(){

    const {data:user, isLoading, isError} = useGetUserQuery();
    const router = useRouter();

    if (!user) {
        return (
            <div className={'flex justify-center flex-col items-center'}>
                <Image src={authentication} alt={'authentication image'} />
                <p className={'text-2xl font-semibold text-primary-color'}>Ooop! you does not have permission for admin</p>
                <Button onClick={() => router.back()} size={'lg'} variant={'bordered'} color={'primary'} className={'my-5'}>Back</Button>
            </div>
        )
    } else {
        return(
            <div className={"py-10 mr-10 ml-60"}>
                <TutorialTable/>
            </div>
        )
    }
}