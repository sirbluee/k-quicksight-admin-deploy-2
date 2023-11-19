import React from 'react';
import SummaryDash from "@/components/Table/SummaryDash";
import UserBar from "@/components/Table/UserBar";
import UserLine from "@/components/Table/UserLine";
import UserTable from "@/components/Table/UserTable";

export default function AdminDashboard (){

    return(
        <section className={"py-32"}>
            <SummaryDash/>
            <div>
                <UserBar/>
                <UserLine/>
                <UserTable/>
            </div>
        </section>
    )
}