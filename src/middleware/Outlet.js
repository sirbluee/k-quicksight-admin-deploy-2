"use client";

import { selectCurrentAccessToken, selectCurrentUser } from "@/store/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { use } from "react";
import { useSelector } from "react-redux";

export default function Outlet({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const token = useSelector(rootState => selectCurrentAccessToken(rootState).token);
    const user = useSelector(rootState => selectCurrentUser(rootState).user);
    console.log("token", token);
    console.log("user", user);
    return children;
}
