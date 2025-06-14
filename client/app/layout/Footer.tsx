import { ChefHat } from "lucide-react";
import { NavLink } from "react-router";

export const Footer = () => {
  return (
    <footer className="bg-sky-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ChefHat className="h-8 w-8 text-sky-600" />
            <span className="text-2xl font-bold">Munchora</span>
          </div>
          <div className="flex space-x-6">
            <NavLink
              to="/about"
              className=" hover:text-sky-500 transition-colors"
            >
              About
            </NavLink>
            <NavLink
              to="/signin"
              className=" hover:text-sky-500 transition-colors"
            >
              Sign In
            </NavLink>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800 text-center ">
          <p>&copy; 2025 Munchora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
