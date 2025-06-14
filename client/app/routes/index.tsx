import { NavLink } from "react-router";
import type { Route } from "./+types/index";
import { Users, ShoppingCart, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Index" },
    { name: "description", content: "Welcome to Munchora!" },
  ];
}

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Next
              <span className="text-sky-600 block">Culinary Adventure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let AI craft personalized recipes from cuisines around the world.
              Organize your cooking with smart grocery lists and share culinary
              discoveries with friends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to="/sign-in">
                <Button
                  size="lg"
                  className="bg-sky-500 hover:bg-sky-600 text-lg px-8 py-3"
                >
                  Start Cooking <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </NavLink>
              <NavLink to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3"
                >
                  Learn More
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Cook Better
            </h2>
            <p className="text-xl text-gray-600">
              From AI-generated recipes to smart grocery planning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  AI Recipe Generation
                </h3>
                <p className="text-gray-600">
                  Generate unique recipes from Asian, European, Mediterranean,
                  and more cuisines using advanced AI technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Smart Grocery Lists
                </h3>
                <p className="text-gray-600">
                  Automatically generate shopping lists from your recipes and
                  organize your grocery shopping efficiently.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  Share & Collaborate
                </h3>
                <p className="text-gray-600">
                  Share your favorite recipes and grocery lists with family and
                  friends for collaborative meal planning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 to-violet-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of home cooks discovering new flavors every day
          </p>
          <NavLink to="/sign-in">
            <Button
              size="lg"
              className="bg-white text-sky-600 hover:bg-sky-50 text-lg px-8 py-3"
            >
              Get Started Free
            </Button>
          </NavLink>
        </div>
      </section>
    </div>
  );
}
