import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layout/layoutNavbar.tsx", [
        index("routes/index.tsx"),
        route("about", "routes/about.tsx"),
        route("faq", "routes/faq.tsx"),
        route("grocery-lists", "routes/grocery-lists.tsx"),
        route("home", "routes/home.tsx"),
        route("profile", "routes/profile.tsx"),
        route("recipes", "routes/recipes.tsx"),
        route("sign-in", "routes/sign-in.tsx"),
    ]),
] satisfies RouteConfig;
