import { useState } from "react";
import type { Route } from "./+types/recipes";
import { Card, CardContent } from "~/components/ui/card";
import {
  ChefHat,
  Clock,
  Filter,
  Globe,
  Heart,
  Loader2,
  Plus,
  Save,
  Search,
  Share2,
  Sparkles,
  Star,
  Trash2,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Textarea } from "~/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipes" },
    { name: "description", content: "Welcome to Munchora!" },
  ];
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  likes: number;
  isPublic: boolean;
  tags: string[];
  ingredients: string[];
  instructions: string[];
}

export default function Recipes() {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Sample public recipes
  const [publicRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: "Creamy Tuscan Chicken",
      description:
        "Rich and creamy chicken with sun-dried tomatoes and spinach in a garlic parmesan sauce",
      image: "/placeholder.png?height=300&width=400",
      cookTime: "35 min",
      servings: 4,
      difficulty: "Medium",
      cuisine: "Italian",
      author: {
        name: "Maria Rossi",
        avatar: "/placeholder.png?height=40&width=40",
      },
      rating: 4.8,
      likes: 234,
      isPublic: true,
      tags: ["comfort-food", "dinner", "chicken"],
      ingredients: [
        "4 chicken breasts",
        "1 cup heavy cream",
        "1/2 cup sun-dried tomatoes",
      ],
      instructions: [
        "Season chicken with salt and pepper",
        "Heat oil in large skillet",
      ],
    },
    {
      id: 2,
      title: "Spicy Korean Bibimbap",
      description:
        "Colorful bowl with seasoned vegetables, rice, and gochujang sauce",
      image: "/placeholder.png?height=300&width=400",
      cookTime: "45 min",
      servings: 2,
      difficulty: "Medium",
      cuisine: "Korean",
      author: {
        name: "Kim Min-jun",
        avatar: "/placeholder.png?height=40&width=40",
      },
      rating: 4.9,
      likes: 189,
      isPublic: true,
      tags: ["healthy", "vegetarian", "spicy"],
      ingredients: [
        "2 cups cooked rice",
        "1 carrot, julienned",
        "2 tbsp gochujang",
      ],
      instructions: ["Prepare all vegetables separately", "Arrange over rice"],
    },
    {
      id: 3,
      title: "Mediterranean Quinoa Salad",
      description:
        "Fresh and healthy salad with quinoa, olives, feta, and lemon dressing",
      image: "/placeholder.png?height=300&width=400",
      cookTime: "20 min",
      servings: 6,
      difficulty: "Easy",
      cuisine: "Mediterranean",
      author: {
        name: "Elena Papadopoulos",
        avatar: "/placeholder.png?height=40&width=40",
      },
      rating: 4.7,
      likes: 156,
      isPublic: true,
      tags: ["healthy", "vegetarian", "salad"],
      ingredients: [
        "1 cup quinoa",
        "1/2 cup kalamata olives",
        "200g feta cheese",
      ],
      instructions: ["Cook quinoa according to package", "Mix all ingredients"],
    },
  ]);

  const cuisineFilters = [
    "Italian",
    "Asian",
    "Mediterranean",
    "Mexican",
    "Indian",
    "American",
  ];
  const difficultyFilters = ["Easy", "Medium", "Hard"];
  const dietFilters = ["Vegetarian", "Vegan", "Gluten-Free", "Keto"];

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const newRecipe: Recipe = {
        id: Date.now(),
        title: "AI-Generated Fusion Delight",
        description:
          "A unique recipe created based on your preferences and dietary needs",
        image: "/placeholder.png?height=300&width=400",
        cookTime: "30 min",
        servings: 4,
        difficulty: "Medium",
        cuisine: "Fusion",
        author: { name: "You", avatar: "/placeholder.png?height=40&width=40" },
        rating: 0,
        likes: 0,
        isPublic: false,
        tags: ["ai-generated", "custom"],
        ingredients: [
          "2 cups jasmine rice",
          "400g chicken thighs, diced",
          "1 red bell pepper, sliced",
          "2 cloves garlic, minced",
          "2 tbsp soy sauce",
          "1 tbsp sesame oil",
          "1 tsp ginger, grated",
          "2 green onions, chopped",
        ],
        instructions: [
          "Cook jasmine rice according to package instructions",
          "Heat sesame oil in a large wok over high heat",
          "Add diced chicken and cook until golden brown",
          "Add garlic and ginger, stir-fry for 30 seconds",
          "Add bell pepper and cook for 2-3 minutes",
          "Add soy sauce and toss everything together",
          "Serve over rice and garnish with green onions",
        ],
      };

      setGeneratedRecipe(newRecipe);
      setIsGenerating(false);
      setIsEditing(true);
    }, 3000);
  };

  const handleEditRecipe = (field: string, value: any) => {
    if (!generatedRecipe) return;

    setGeneratedRecipe({
      ...generatedRecipe,
      [field]: value,
    });
  };

  const filteredRecipes = publicRecipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some(
        (filter) =>
          recipe.cuisine === filter ||
          recipe.difficulty === filter ||
          recipe.tags.includes(filter.toLowerCase())
      );

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-800 mb-2">
          Recipe Studio
        </h1>
        <p className="text-slate-500">
          Discover amazing recipes or create your own with AI
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="discover" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Discover</span>
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center space-x-2">
            <Wand2 className="h-4 w-4" />
            <span>AI Create</span>
          </TabsTrigger>
        </TabsList>

        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search recipes, cuisines, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 backdrop-blur-sm border-slate-200"
              />
            </div>
            <Button
              variant="outline"
              className="bg-white/70 backdrop-blur-sm border-slate-200"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            {[...cuisineFilters, ...difficultyFilters, ...dietFilters].map(
              (filter) => (
                <Button
                  key={filter}
                  variant={
                    selectedFilters.includes(filter) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    setSelectedFilters((prev) =>
                      prev.includes(filter)
                        ? prev.filter((f) => f !== filter)
                        : [...prev, filter]
                    );
                  }}
                  className={
                    selectedFilters.includes(filter)
                      ? "bg-sky-500 hover:bg-sky-600"
                      : "bg-white/70 backdrop-blur-sm border-slate-200 hover:bg-sky-50"
                  }
                >
                  {filter}
                </Button>
              )
            )}
          </div>

          {/* Recipe Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                className="group border-0 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={recipe.image || "/placeholder.png"}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Heart className="h-4 w-4 text-slate-400 hover:text-rose-500 transition-colors" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4 mb-3 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>{recipe.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={recipe.author.avatar || "/placeholder.png"}
                        />
                        <AvatarFallback className="text-xs">
                          {recipe.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-slate-500">
                        {recipe.author.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-sky-100 text-sky-700 border-0 text-xs"
                      >
                        {recipe.cuisine}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-slate-200 text-xs"
                      >
                        {recipe.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Create Tab */}
        <TabsContent value="create" className="space-y-6">
          {!generatedRecipe ? (
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-sky-100 to-violet-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-10 w-10 text-sky-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                    Create with AI
                  </h2>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Describe what you want to cook and let our AI create a
                    personalized recipe for you. You can then edit and refine it
                    to perfection.
                  </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Describe your ideal recipe
                    </label>
                    <Textarea
                      placeholder="E.g., 'A healthy Mediterranean pasta with lots of vegetables and feta cheese' or 'Spicy Korean-style chicken wings for a party'"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={4}
                      className="bg-white/70 backdrop-blur-sm border-slate-200"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-sky-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sky-800 mb-2">
                        💡 Be Specific
                      </h4>
                      <p className="text-sky-700">
                        Include cuisine type, main ingredients, and cooking
                        style
                      </p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <h4 className="font-medium text-emerald-800 mb-2">
                        🥗 Dietary Needs
                      </h4>
                      <p className="text-emerald-700">
                        Mention any allergies or dietary restrictions
                      </p>
                    </div>
                    <div className="bg-violet-50 p-4 rounded-lg">
                      <h4 className="font-medium text-violet-800 mb-2">
                        ⏱️ Time & Skill
                      </h4>
                      <p className="text-violet-700">
                        Specify cooking time and difficulty level
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleAIGenerate}
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white py-6 text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating your recipe...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate Recipe
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Generated Recipe Editor */
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recipe Preview */}
              <div className="lg:col-span-2">
                <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-sky-500 to-violet-500 p-2 rounded-lg">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-slate-800">
                            Your AI Recipe
                          </h2>
                          <p className="text-sm text-slate-500">
                            Click any section to edit directly
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          size="sm"
                          className="bg-sky-500 hover:bg-sky-600"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Recipe
                        </Button>
                      </div>
                    </div>

                    {/* Editable Title */}
                    <div className="mb-6">
                      <Input
                        value={generatedRecipe.title}
                        onChange={(e) =>
                          handleEditRecipe("title", e.target.value)
                        }
                        className="text-3xl font-bold border-0 bg-transparent p-2 hover:bg-slate-50 focus:bg-white focus:border focus:border-sky-200 rounded-lg transition-all"
                        placeholder="Recipe title..."
                      />
                    </div>

                    {/* Editable Description */}
                    <div className="mb-6">
                      <Textarea
                        value={generatedRecipe.description}
                        onChange={(e) =>
                          handleEditRecipe("description", e.target.value)
                        }
                        className="text-slate-600 border-0 bg-transparent p-2 hover:bg-slate-50 focus:bg-white focus:border focus:border-sky-200 rounded-lg transition-all resize-none"
                        placeholder="Recipe description..."
                        rows={2}
                      />
                    </div>

                    {/* Editable Recipe Meta */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Cook Time
                        </label>
                        <Input
                          value={generatedRecipe.cookTime}
                          onChange={(e) =>
                            handleEditRecipe("cookTime", e.target.value)
                          }
                          className="text-sm border-slate-200 hover:border-sky-300 focus:border-sky-400"
                          placeholder="30 min"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Servings
                        </label>
                        <Input
                          type="number"
                          value={generatedRecipe.servings}
                          onChange={(e) =>
                            handleEditRecipe(
                              "servings",
                              Number.parseInt(e.target.value) || 1
                            )
                          }
                          className="text-sm border-slate-200 hover:border-sky-300 focus:border-sky-400"
                          placeholder="4"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Difficulty
                        </label>
                        <select
                          value={generatedRecipe.difficulty}
                          onChange={(e) =>
                            handleEditRecipe("difficulty", e.target.value)
                          }
                          className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 hover:border-sky-300 focus:border-sky-400 focus:outline-none"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Cuisine
                        </label>
                        <Input
                          value={generatedRecipe.cuisine}
                          onChange={(e) =>
                            handleEditRecipe("cuisine", e.target.value)
                          }
                          className="text-sm border-slate-200 hover:border-sky-300 focus:border-sky-400"
                          placeholder="Italian"
                        />
                      </div>
                    </div>

                    {/* Editable Ingredients */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Ingredients
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newIngredients = [
                              ...generatedRecipe.ingredients,
                              "",
                            ];
                            handleEditRecipe("ingredients", newIngredients);
                          }}
                          className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Ingredient
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {generatedRecipe.ingredients.map(
                          (ingredient, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 group"
                            >
                              <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0"></div>
                              <Input
                                value={ingredient}
                                onChange={(e) => {
                                  const newIngredients = [
                                    ...generatedRecipe.ingredients,
                                  ];
                                  newIngredients[index] = e.target.value;
                                  handleEditRecipe(
                                    "ingredients",
                                    newIngredients
                                  );
                                }}
                                className="flex-1 border-0 bg-transparent hover:bg-slate-50 focus:bg-white focus:border focus:border-sky-200 rounded-lg transition-all"
                                placeholder="Enter ingredient..."
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newIngredients =
                                    generatedRecipe.ingredients.filter(
                                      (_, i) => i !== index
                                    );
                                  handleEditRecipe(
                                    "ingredients",
                                    newIngredients
                                  );
                                }}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50 p-1 h-auto transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Editable Instructions */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Instructions
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newInstructions = [
                              ...generatedRecipe.instructions,
                              "",
                            ];
                            handleEditRecipe("instructions", newInstructions);
                          }}
                          className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Step
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {generatedRecipe.instructions.map(
                          (instruction, index) => (
                            <div key={index} className="flex space-x-4 group">
                              <div className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </div>
                              <div className="flex-1 flex items-start space-x-2">
                                <Textarea
                                  value={instruction}
                                  onChange={(e) => {
                                    const newInstructions = [
                                      ...generatedRecipe.instructions,
                                    ];
                                    newInstructions[index] = e.target.value;
                                    handleEditRecipe(
                                      "instructions",
                                      newInstructions
                                    );
                                  }}
                                  className="flex-1 border-0 bg-transparent hover:bg-slate-50 focus:bg-white focus:border focus:border-sky-200 rounded-lg transition-all resize-none"
                                  placeholder="Enter instruction step..."
                                  rows={2}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newInstructions =
                                      generatedRecipe.instructions.filter(
                                        (_, i) => i !== index
                                      );
                                    handleEditRecipe(
                                      "instructions",
                                      newInstructions
                                    );
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50 p-1 h-auto transition-opacity mt-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Recipe Tags */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">
                          Tags
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newTags = [...generatedRecipe.tags, ""];
                            handleEditRecipe("tags", newTags);
                          }}
                          className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Tag
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {generatedRecipe.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-1 group"
                          >
                            <Input
                              value={tag}
                              onChange={(e) => {
                                const newTags = [...generatedRecipe.tags];
                                newTags[index] = e.target.value;
                                handleEditRecipe("tags", newTags);
                              }}
                              className="w-auto min-w-20 text-sm border-0 bg-sky-100 text-sky-700 hover:bg-sky-200 focus:bg-white focus:border focus:border-sky-300 rounded-full px-3 py-1"
                              placeholder="tag"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newTags = generatedRecipe.tags.filter(
                                  (_, i) => i !== index
                                );
                                handleEditRecipe("tags", newTags);
                              }}
                              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-50 p-1 h-auto rounded-full transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Chat Panel */}
              <div className="lg:col-span-1">
                <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-sm sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                      <Wand2 className="h-5 w-5 mr-2 text-sky-600" />
                      Refine with AI
                    </h3>

                    <div className="space-y-4">
                      <Textarea
                        placeholder="Ask AI to modify the recipe... e.g., 'Make it spicier' or 'Add more vegetables'"
                        rows={3}
                        className="bg-white border-slate-200"
                      />
                      <Button className="w-full bg-sky-500 hover:bg-sky-600">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Refine Recipe
                      </Button>
                    </div>

                    <div className="mt-6 space-y-2">
                      <h4 className="text-sm font-medium text-slate-700">
                        Quick Actions
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          Make Healthier
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Add Spice
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Reduce Time
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          More Protein
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                      <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                        <p className="font-medium mb-1">💡 Editing Tips:</p>
                        <ul className="space-y-1">
                          <li>• Click any field to edit directly</li>
                          <li>• Use + buttons to add items</li>
                          <li>• Hover to see delete options</li>
                          <li>• Changes save automatically</li>
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setGeneratedRecipe(null);
                          setAiPrompt("");
                          setIsEditing(false);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Recipe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
