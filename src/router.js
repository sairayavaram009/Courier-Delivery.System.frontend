import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/AboutView.vue"),
    },
    {
      path: "/subscribe",
      name: "subscribe",
      component: () => import("./views/SubscribersView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/DashboardView.vue"),
      meta: {
        requiresAuth: true,
      },
      
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/DashboardView.vue"),
      meta: {
        requiresAuth: true,
      },
      
    },
    {
      path: "/scheduling",
      name: "scheduling",
      component: () => import("./views/scheduledelivery.vue"),
      meta: {
        requiresAuth: true,
      },
      
    },
    {
      path: "/track",
      name: "track",
      component: () => import("./views/TrackDelivery.vue"),
    },
    {
      path: "/user-control",
      name: "user-control",
      component: () => import("./views/usercontrol.vue"),
    },
    {
      path: "/tours",
      name: "tours",
      component: () => import("./views/ToursWeoffer.vue"),
    },
    {
      path: "/book",
      name: "book",
      component: () => import("../src/views/Subscribe.vue"),
    },
    
    {
      path: "/home",
      name: "home",
      component: () => import("./views/HomeView.vue"),
    },
    {
      path: "/recipe/:id",
      name: "editRecipe",
      props: true,
      component: () => import("../src/views/EditTour.vue"),
    },
    {
      path: "/ingredients",
      name: "ingredients",
      component: () => import("./views/AttractionsList.vue"),
    },
  ],
});

export default router;
