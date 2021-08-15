import { createRouter, createWebHashHistory } from "vue-router";
import Register from "@/views/Register";
import Login from "@/views/Login";
import GlobalFeed from "@/views/GlobalFeed";
import YourFeed from "@/views/YourFeed";
import TagFeed from "@/views/TagFeed";
import Article from "@/views/Article";
import CreateArticle from "@/views/CreateArticle";
import EditArticle from "@/views/EditArticle";

const routes = [
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "globalFeed",
    component: GlobalFeed,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: YourFeed,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: TagFeed,
  },
  {
    path: "/article/new",
    name: "createArticle",
    component: CreateArticle,
  },
  {
    path: "/article/:slug",
    name: "article",
    component: Article,
  },
  {
    path: "/article/:slug/edit",
    name: "editArticle",
    component: EditArticle,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "userProfile",
    component: GlobalFeed,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
