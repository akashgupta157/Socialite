"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
        useEffect(() => {
            if (!isAuthenticated) {
                return redirect("/login");
            }
        }, []);
        if (!isAuthenticated) {
            return null;
        }
        return <Component {...props} />;
    };
}