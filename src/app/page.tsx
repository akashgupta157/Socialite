'use client'
import isAuth from '@/IsCompAuth';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'
const Page = () => {
    useEffect(() => {
        return redirect("/home");
    }, []);
    return (
        <></>
    )
}
export default isAuth(Page);
