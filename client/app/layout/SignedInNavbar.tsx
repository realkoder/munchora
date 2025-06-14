import { NavLink, useLocation } from "react-router";
import { Button } from "~/components/ui/button";
import { ChefHat, House, ShoppingCart, Sparkles } from "lucide-react";
import useLoginUser from "~/hooks/useLoginUser";

export default function Navbar() {
  const location = useLocation();
  const { signOutUser } = useLoginUser();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-sky-400" />
            <span className="text-2xl font-bold text-gray-900">Munchora</span>
          </NavLink>
          <div className="flex items-center space-x-1">
            <NavLink to="/home">
              <Button variant="ghost" className="flex items-center space-x-2">
                <House className="h-4 w-4" />
                <span
                  className={`${
                    isActive("/home") ? "border-black border-b" : ""
                  }`}
                >
                  Home
                </span>
              </Button>
            </NavLink>
            <NavLink to="/recipes">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span
                  className={`${
                    isActive("/recipes") ? "border-black border-b" : ""
                  }`}
                >
                  Generate Recipe
                </span>
              </Button>
            </NavLink>
            <NavLink to="/grocery-lists">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span
                  className={`${
                    isActive("/grocery-lists") ? "border-black border-b" : ""
                  }`}
                >
                  Grocery Lists
                </span>
              </Button>
            </NavLink>
            <NavLink to="/about">
              <Button variant="ghost">
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
          <Button
            className="bg-sky-500 hover:bg-sky-500 text-white"
            onClick={signOutUser}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
}
