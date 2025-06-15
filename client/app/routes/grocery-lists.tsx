import { useState } from "react";
import type { Route } from "./+types/grocery-lists";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Plus, Share2, ShoppingCart, Trash2, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "GroceryLists" },
    { name: "GroceryLists", content: "Welcome to Munchora!" },
  ];
}

interface GroceryItem {
  id: number;
  name: string;
  completed: boolean;
  category: string;
}

interface GroceryList {
  id: number;
  name: string;
  items: GroceryItem[];
  shared: boolean;
  collaborators?: string[];
}
export default function GroceryLists() {
  const [groceryLists, setGroceryLists] = useState<GroceryList[]>([
    {
      id: 1,
      name: "Weekly Shopping",
      shared: false,
      items: [
        { id: 1, name: "Chicken breast", completed: false, category: "Meat" },
        { id: 2, name: "Rice noodles", completed: true, category: "Pantry" },
        { id: 3, name: "Bell peppers", completed: false, category: "Produce" },
        { id: 4, name: "Garlic", completed: false, category: "Produce" },
        { id: 5, name: "Soy sauce", completed: true, category: "Condiments" },
      ],
    },
    {
      id: 2,
      name: "Dinner Party Prep",
      shared: true,
      collaborators: ["Sarah", "Mike"],
      items: [
        {
          id: 6,
          name: "Salmon fillets",
          completed: false,
          category: "Seafood",
        },
        { id: 7, name: "Asparagus", completed: false, category: "Produce" },
        { id: 8, name: "Lemon", completed: false, category: "Produce" },
        { id: 9, name: "White wine", completed: false, category: "Beverages" },
      ],
    },
  ]);

  const [newListName, setNewListName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const createNewList = () => {
    if (!newListName.trim()) return;

    const newList: GroceryList = {
      id: Date.now(),
      name: newListName,
      shared: false,
      items: [],
    };

    setGroceryLists([...groceryLists, newList]);
    setNewListName("");
  };

  const addItemToList = (listId: number) => {
    if (!newItemName.trim()) return;

    const newItem: GroceryItem = {
      id: Date.now(),
      name: newItemName,
      completed: false,
      category: "Other",
    };

    setGroceryLists(
      groceryLists.map((list) =>
        list.id === listId ? { ...list, items: [...list.items, newItem] } : list
      )
    );
    setNewItemName("");
  };

  const toggleItemCompleted = (listId: number, itemId: number) => {
    setGroceryLists(
      groceryLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : list
      )
    );
  };

  const deleteList = (listId: number) => {
    setGroceryLists(groceryLists.filter((list) => list.id !== listId));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Grocery Lists
          </h1>
          <p className="text-gray-600">
            Organize your shopping and share with others
          </p>
        </div>

        {/* Create New List */}
        <div className="flex items-center space-x-2">
          <Input
            placeholder="New list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="w-48"
          />
          <Button
            onClick={createNewList}
            className="bg-sky-500 hover:bg-sky-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create List
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {groceryLists.map((list) => (
          <Card key={list.id} className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5 text-sky-600" />
                    <span>{list.name}</span>
                    {list.shared && (
                      <Badge variant="secondary" className="ml-2">
                        <Users className="h-3 w-3 mr-1" />
                        Shared
                      </Badge>
                    )}
                  </CardTitle>
                  {list.collaborators && (
                    <CardDescription>
                      Shared with: {list.collaborators.join(", ")}
                    </CardDescription>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteList(list.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Add New Item */}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add item..."
                  value={selectedListId === list.id ? newItemName : ""}
                  onChange={(e) => {
                    setNewItemName(e.target.value);
                    setSelectedListId(list.id);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      addItemToList(list.id);
                      setSelectedListId(null);
                    }
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    addItemToList(list.id);
                    setSelectedListId(null);
                  }}
                  className="bg-sky-500 hover:bg-sky-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {list.items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg border ${
                      item.completed
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-gray-100"
                    }`}
                  >
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() =>
                        toggleItemCompleted(list.id, item.id)
                      }
                    />
                    <span
                      className={`flex-1 ${
                        item.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                ))}

                {list.items.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No items yet. Add your first item above!</p>
                  </div>
                )}
              </div>

              {/* Progress */}
              {list.items.length > 0 && (
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>
                      {list.items.filter((item) => item.completed).length} of{" "}
                      {list.items.length} completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (list.items.filter((item) => item.completed).length /
                            list.items.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {groceryLists.length === 0 && (
        <div className="text-center py-16">
          <ShoppingCart className="h-24 w-24 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No grocery lists yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first grocery list to get started
          </p>
          <Button className="bg-sky-500 hover:bg-sky-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First List
          </Button>
        </div>
      )}
    </div>
  );
}
