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
      component: () => import("./views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue")
    },
    {
      path: "/add-delivery-request",
      name: "scheduling",
      component: () => import("./views/Scheduledelivery.vue")
    },
    {
      path: "/customers",
      name: "customers",
      component: () => import("./views/Customers.vue")
    },
    {
      path: "/create-customer",
      name: "createCustomer",
      component: () => import("./views/CreateCustomer.vue")
    },
    {
      path: "/couriers",
      name: "couriers",
      component: () => import("./views/Couriers.vue")
    },
    {
      path: "/create-courier",
      name: "createcourier",
      component: () => import("./views/Createcourier.vue")
    },
    {
      path: "/users",
      name: "users",
      component: () => import("./views/Users.vue")
    },
    {
      path: "/create-user",
      name: "createUser",
      component: () => import("./views/CreateUser.vue")
    },
    {
      path: "/delivery-requests",
      name: "deliveryRequests",
      component: () => import("./views/DeliveryRequests.vue")
    },
    {
      path: "/delivery-requests/:filter",
      name: "deliveryRequests",
      component: () => import("./views/DeliveryRequests.vue")
    },
  ],
});

export default router;
