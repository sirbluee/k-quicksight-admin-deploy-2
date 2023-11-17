
import React from 'react'
import UserBar from "@/components/Table/UserBar";
import UserLine from "@/components/Table/UserLine";
import UserTable from '@/components/Table/UserTable';

export default function Homepage() {
  return (
    <>
      <div className={"grid md:grid-cols-2 pt-32"}>
        <UserBar/>
        <UserLine/>
      </div>
      <UserTable/>
    </>
      
  )
}

