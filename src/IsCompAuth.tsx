'use client'
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "./redux/slices/userSlice";
export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const dispatch = useDispatch();
        const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
        useEffect(() => {
            const user = localStorage.getItem("user");
            if (user) {
                dispatch(LOGIN(JSON.parse(user)));
            } else if (!isAuthenticated) {
                return redirect("/login");
            }
        }, []);
        if (!isAuthenticated) {
            return null;
        }
        return <Component {...props} />;
    };
}
