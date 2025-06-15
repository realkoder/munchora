import { useAtomValue } from "jotai";
import { ChefHat } from "lucide-react";
import { NavLink } from "react-router";
import { userLoginAtom } from "~/atoms/userLoginAtom";
import { Button } from "~/components/ui/button";
import useLoginUser from "~/hooks/useLoginUser";

export const Footer = () => {
  const userLogin = useAtomValue(userLoginAtom);
  const { signOutUser } = useLoginUser();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-sky-600" />
              <span className="text-2xl font-bold">Muncora</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Discover your next culinary adventure with AI-powered recipe
              generation and smart meal planning.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-lg font-semibold">10K+</div>
                <div className="text-xs text-gray-400">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">5K+</div>
                <div className="text-xs text-gray-400">Users</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">4.9★</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <div className="space-y-2">
              <NavLink
                to="/recipes"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Recipes
              </NavLink>
              <NavLink
                to="/grocery-lists"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Grocery Lists
              </NavLink>
              <NavLink
                to="/about"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                About
              </NavLink>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <NavLink
                to="/faq"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                FAQ
              </NavLink>
              <NavLink
                to="/auth/signin"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/auth/signup"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Muncora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
