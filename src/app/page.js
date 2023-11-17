
import React from 'react'
import UserBar from "@/components/Table/UserBar";
import UserLine from "@/components/Table/UserLine";

export default function Homepage() {
  return (
      <div className={"grid md:grid-cols-2 py-32 px-14"}>
        <UserBar/>
        <UserLine/>
      </div>
  )
}

