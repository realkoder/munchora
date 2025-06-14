import { Outlet } from "react-router";
import { Footer } from "./Footer";
import Navbar from "./Navbar";
import { useState } from "react";
import SignedInNavbar from "./SignedInNavbar";

export default function layoutNavbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="min-h-screen text-center flex flex-col">
      {isSignedIn ? <SignedInNavbar /> : <Navbar />}
      <div className={"flex-1"}>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
