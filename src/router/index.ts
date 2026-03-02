import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import MainLayout from "../components/Layout.vue";
import ChatList from "../components/ChatList.vue";
import ChatWindow from "../components/ChatWindow.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: ChatList,
      },
      {
        path: "chat/:id",
        name: "chat",
        components: {
          default: ChatList,
          window: ChatWindow,
        },
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
