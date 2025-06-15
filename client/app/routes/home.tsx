import { useState } from "react";
import type { Route } from "./+types/home";
import {
  BookOpen,
  Clock,
  Heart,
  Plus,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { useAtomValue } from "jotai";
import { userLoginAtom } from "~/atoms/userLoginAtom";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to Munchora!" },
  ];
}

export default function Home() {
  const userLogin = useAtomValue(userLoginAtom);
  const [recentRecipes] = useState([
    {
      id: 1,
      title: "Spicy Thai Basil Chicken",
      cuisine: "Asian",
      cookTime: "25 min",
      difficulty: "Medium",
      image: "/placeholder.png?height=200&width=300",
    },
    {
      id: 2,
      title: "Mediterranean Quinoa Bowl",
      cuisine: "Mediterranean",
      cookTime: "15 min",
      difficulty: "Easy",
      image: "/placeholder.png?height=200&width=300",
    },
    {
      id: 3,
      title: "Classic Italian Carbonara",
      cuisine: "European",
      cookTime: "20 min",
      difficulty: "Medium",
      image: "/placeholder.png?height=200&width=300",
    },
  ]);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Clean Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-slate-800 mb-1">
              Good morning, {userLogin?.user.fullname}
            </h1>
            <p className="text-slate-500 text-sm">
              What would you like to cook today?
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <NavLink to="/recipes">
              <Button
                size="sm"
                className="bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Recipe
              </Button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Clean Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Recipes
                </p>
                <p className="text-2xl font-light text-slate-800">24</p>
              </div>
              <div className="bg-sky-100 p-2 rounded-lg">
                <BookOpen className="h-4 w-4 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Lists
                </p>
                <p className="text-2xl font-light text-slate-800">5</p>
              </div>
              <div className="bg-emerald-100 p-2 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Streak
                </p>
                <p className="text-2xl font-light text-slate-800">12</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Recipes - Main Focus */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-slate-800">Recent Recipes</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-700"
          >
            View all
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="group border-0 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg overflow-hidden">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-slate-800 text-sm leading-tight">
                    {recipe.title}
                  </h3>
                  <Heart className="h-4 w-4 text-slate-300 hover:text-rose-400 cursor-pointer transition-colors" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-slate-100 text-slate-600 border-0"
                    >
                      {recipe.cuisine}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-slate-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{recipe.cookTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions - Subtle */}
      <div className="grid md:grid-cols-2 gap-4">
        <NavLink to="/recipes">
          <Card className="group border-0 bg-gradient-to-br from-sky-50 to-sky-100/50 hover:from-sky-100 hover:to-sky-200/50 transition-all duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-sky-500 p-3 rounded-xl group-hover:scale-105 transition-transform">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 mb-1">
                    Generate New Recipe
                  </h3>
                  <p className="text-sm text-slate-600">
                    Create AI-powered recipes from any cuisine
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </NavLink>

        <NavLink to="/grocery-lists">
          <Card className="group border-0 bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-emerald-200/50 transition-all duration-200 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-500 p-3 rounded-xl group-hover:scale-105 transition-transform">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 mb-1">
                    Manage Grocery Lists
                  </h3>
                  <p className="text-sm text-slate-600">
                    Organize shopping and share with family
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </NavLink>
      </div>
    </div>
  );
}
