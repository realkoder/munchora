import { NavLink, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { BookA, ChefHat, MessageCircleQuestion } from "lucide-react";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-sky-400" />
            <span className="text-2xl font-bold text-gray-900">Munchora</span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/faq">
              <Button variant="ghost" className="flex items-center">
                <MessageCircleQuestion />
                <span
                  className={`${
                    isActive("/faq") ? "border-black border-b" : ""
                  }`}
                >
                  FAQ
                </span>
              </Button>
            </NavLink>
            <NavLink to="/about">
              <Button variant="ghost" className="flex items-center">
                <BookA />
                <span
                  className={`${
                    isActive("/about") ? "border-black border-b" : ""
                  }`}
                >
                  About
                </span>
              </Button>
            </NavLink>
          </div>

          <Button asChild className="bg-sky-500 hover:bg-sky-500 text-white">
            <NavLink to="/sign-in">Sign In</NavLink>
          </Button>
        </div>
      </div>
    </nav>
  );
}
