import { useState } from "react";
import type { Route } from "./+types/home";
import {
  BookOpen,
  Clock,
  Heart,
  Plus,
  ShoppingCart,
  Sparkles,
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userLogin?.user.fullname}!
          </h1>
          <p className="text-gray-600">
            Ready to create something delicious today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <NavLink to="/recipes">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-sky-400 to-sky-500 text-white">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Generate Recipe</h3>
                <p className="text-sm opacity-90">Create AI-powered recipes</p>
              </CardContent>
            </Card>
          </NavLink>

          <NavLink to="/grocery-lists">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Grocery Lists</h3>
                <p className="text-sm opacity-90">Manage shopping lists</p>
              </CardContent>
            </Card>
          </NavLink>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-violet-400 to-violet-500 text-white">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Recipe Book</h3>
              <p className="text-sm opacity-90">Browse saved recipes</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-0 bg-gradient-to-br from-rose-400 to-rose-500 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Share & Connect</h3>
              <p className="text-sm opacity-90">Connect with other cooks</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Recipes */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Recipes</h2>
            <Button variant="outline" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>View All</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={recipe.image || "/placeholder.png"}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{recipe.title}</h3>
                    <Heart className="h-5 w-5 text-gray-400 hover:text-rose-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="secondary">{recipe.cuisine}</Badge>
                    <Badge variant="outline">{recipe.difficulty}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{recipe.cookTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardHeader className="text-sm font-medium text-gray-600">
                Total Recipes
              </CardHeader>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-600">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Grocery Lists
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-600">2 active lists</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Cooking Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-gray-600">Keep it up!</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
