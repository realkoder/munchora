import { useState } from "react";
import type { Route } from "./+types/recipes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ArrowLeft,
  ChefHat,
  Clock,
  Loader2,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { NavLink } from "react-router";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipes" },
    { name: "description", content: "Welcome to Munchora!" },
  ];
}

const cuisineTypes = [
  { id: "asian", name: "Asian", emoji: "🥢" },
  { id: "european", name: "European", emoji: "🍝" },
  { id: "mediterranean", name: "Mediterranean", emoji: "🫒" },
  { id: "mexican", name: "Mexican", emoji: "🌮" },
  { id: "indian", name: "Indian", emoji: "🍛" },
  { id: "american", name: "American", emoji: "🍔" },
  { id: "middle-eastern", name: "Middle Eastern", emoji: "🥙" },
  { id: "african", name: "African", emoji: "🍲" },
];

export default function Recipes() {
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const handleGenerate = async () => {
    if (!selectedCuisine && !customPrompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI recipe generation
    setTimeout(() => {
      const sampleRecipe = {
        title:
          selectedCuisine === "asian"
            ? "Honey Garlic Stir-Fry Noodles"
            : selectedCuisine === "mediterranean"
            ? "Lemon Herb Grilled Chicken"
            : "Delicious " +
              (cuisineTypes.find((c) => c.id === selectedCuisine)?.name ||
                "Custom") +
              " Recipe",
        description:
          "A flavorful and aromatic dish that brings together the best of traditional cooking techniques with modern ingredients.",
        cookTime: "30 minutes",
        servings: 4,
        difficulty: "Medium",
        ingredients: [
          "2 cups rice noodles",
          "3 cloves garlic, minced",
          "2 tbsp honey",
          "3 tbsp soy sauce",
          "1 bell pepper, sliced",
          "2 green onions, chopped",
          "2 tbsp vegetable oil",
          "1 tsp sesame oil",
        ],
        instructions: [
          "Cook rice noodles according to package directions and drain.",
          "Heat vegetable oil in a large wok or skillet over high heat.",
          "Add garlic and stir-fry for 30 seconds until fragrant.",
          "Add bell pepper and cook for 2-3 minutes until tender-crisp.",
          "Add cooked noodles, honey, and soy sauce. Toss to combine.",
          "Drizzle with sesame oil and garnish with green onions.",
          "Serve immediately while hot.",
        ],
      };

      setGeneratedRecipe(sampleRecipe);
      setIsGenerating(false);
    }, 3000);
  };

  if (generatedRecipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl font-bold mb-2">
                    {generatedRecipe.title}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {generatedRecipe.description}
                  </CardDescription>
                </div>
                <Button className="bg-sky-500 hover:bg-sky-600">
                  Save Recipe
                </Button>
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{generatedRecipe.cookTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    {generatedRecipe.servings} servings
                  </span>
                </div>
                <Badge variant="outline">{generatedRecipe.difficulty}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {generatedRecipe.ingredients.map(
                    (ingredient: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        <span>{ingredient}</span>
                      </div>
                    )
                  )}
                </div>
                <Button variant="outline" className="mt-4">
                  Add to Grocery List
                </Button>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                <div className="space-y-4">
                  {generatedRecipe.instructions.map(
                    (instruction: string, index: number) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="pt-1">{instruction}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Generate Your Perfect Recipe
          </h1>
          <p className="text-lg text-gray-600">
            Choose a cuisine or describe what you're craving, and let AI create
            a personalized recipe for you
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-sky-600" />
              <span>AI Recipe Generator</span>
            </CardTitle>
            <CardDescription>
              Select a cuisine type or provide custom instructions
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Cuisine Selection */}
            <div>
              <Label className="text-base font-medium mb-4 block">
                Choose a Cuisine
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {cuisineTypes.map((cuisine) => (
                  <Button
                    key={cuisine.id}
                    variant={
                      selectedCuisine === cuisine.id ? "default" : "outline"
                    }
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      selectedCuisine === cuisine.id
                        ? "bg-sky-500 hover:bg-sky-600"
                        : "hover:bg-sky-50"
                    }`}
                    onClick={() => setSelectedCuisine(cuisine.id)}
                  >
                    <span className="text-2xl">{cuisine.emoji}</span>
                    <span className="text-sm">{cuisine.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <div>
              <Label
                htmlFor="custom-prompt"
                className="text-base font-medium mb-2 block"
              >
                Or Describe Your Ideal Recipe
              </Label>
              <Textarea
                id="custom-prompt"
                placeholder="E.g., 'A healthy vegetarian pasta dish with lots of vegetables' or 'Something spicy with chicken and rice'"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={4}
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={
                (!selectedCuisine && !customPrompt.trim()) || isGenerating
              }
              className="w-full bg-sky-500 hover:bg-sky-600 text-lg py-6"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Your Recipe...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Recipe
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
