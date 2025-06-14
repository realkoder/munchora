import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { userLoginAtom } from "~/atoms/userLoginAtom";
import { useFetch } from "~/lib/api-client";
import type { ICreateUser, ILoginResponse } from "~/types/user.interface";

const useLoginUser = () => {
    const [userLogin, setUserlogin] = useAtom(userLoginAtom);
    const { fetchData: postLogin } = useFetch<ILoginResponse>();
    const { fetchData: postUser } = useFetch<ICreateUser>();
    const { fetchData: signOut } = useFetch<{ message: string }>();
    const navigate = useNavigate();

    const createNewUser = async (user: ICreateUser) => {
        try {
            const newUserData = await postUser("/users", {
                method: "POST",
                data: { user },
            });

            if (newUserData) {
                toast("Welcome to Muncora - You've successfully signed up.");
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    const loginUser = async (email: string, password: string) => {
        try {
            const loginData = await postLogin("/login", {
                method: "POST",
                data: { email, password },
            });

            if (loginData) {
                console.log("DATA", loginData);
                setUserlogin(loginData);
                toast("Successfully signed in.");
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    const signOutUser = async () => {
        setUserlogin(null);
        const signedOutRes = await signOut("logout", { method: "DELETE" })

        if (signedOutRes.message) {
            navigate("/")
        } else {
            toast.info("Could not sign you out...")
        }

    }

    return { createNewUser, loginUser, signOutUser };
}

export default useLoginUser;