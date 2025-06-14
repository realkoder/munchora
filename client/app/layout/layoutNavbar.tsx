import { Outlet } from "react-router";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";
import SignedInNavbar from "./SignedInNavbar";
import { useAtomValue } from "jotai";
import { userLoginAtom } from "~/atoms/userLoginAtom";

export default function layoutNavbar() {
  const userLogin = useAtomValue(userLoginAtom);

  return (
    <div className="min-h-screen text-center flex flex-col">
      {userLogin?.user.id ? <SignedInNavbar /> : <Navbar />}
      <div className={"flex-1"}>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
