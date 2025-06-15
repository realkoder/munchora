import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Route } from "./+types/sign-in";
import { SignIn } from "~/components/auth/Signin";
import SignUp from "~/components/auth/signUp";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAtomValue } from "jotai";
import { userLoginAtom } from "~/atoms/userLoginAtom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Signin - Antik Moderne" },
    { name: "description", content: "Signin" },
  ];
}

export default function SignInPage() {
  const userLogin = useAtomValue(userLoginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HEP", userLogin);
    if (userLogin?.user.id) navigate("/home");
  }, [userLogin]);

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="my-4 text-4xl font-bold mb-4">Sign in or up</h1>

      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" className="cursor-pointer">
            Sign in
          </TabsTrigger>
          <TabsTrigger value="signup" className="cursor-pointer">
            Create account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignIn />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
