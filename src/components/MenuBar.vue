<script setup>
import ocLogo from "/oc_logo.png";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";

const router = useRouter();

const user = ref(null);
const title = ref("Courier Delivery System");
const logoURL = ref("");

onMounted(() => {
  logoURL.value = ocLogo;
  user.value = JSON.parse(localStorage.getItem("user"));
  if(user == null){
      router.push({ name: "login" });
  }
});

function logout() {
  UserServices.logoutUser()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  localStorage.removeItem("user");
  user.value = null;
  router.push({ name: "login" });
}

const routes = {
  1:[
    {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi-view-dashboard"
  },
   {
    path: "/companies/",
    name: "Companies",
    icon: "mdi-account-group"
  },
  {
    path: "/users/",
    name: "Users",
    icon: "mdi-account-group"
  },
  // {
  //   path: "/couriers",
  //   name: "Couriers",
  //   icon: "mdi-truck"
  // },
  {
    path: "/customers",
    name: "Customers",
    icon: "mdi-account"
  },
   {
    path: "/add-delivery-request",
    name: "Schedule Delivery",
    icon: "mdi-truck-delivery-outline"
  },
  {
    path: "/delivery-requests/all",
    name: "All Delivery Requests",
    icon: "mdi-truck-check"
  },
  {
  path: "/delivery-requests/ordered/",
  name: "My Delivery Requests",
  icon: "mdi-truck"
  }
  ],
  2:[
    {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi-view-dashboard"
    },
    // {
    //   path: "/couriers",
    //   name: "Couriers",
    // icon: "mdi-truck"
    // },
    {
    path: "/customers",
    name: "Customers",
    icon: "mdi-account"
    },
    {
      path: "/delivery-requests/ordered/",
      name: "My Delivery Requests",
    icon: "mdi-truck"
    },
    {
      path: "/add-delivery-request",
      name: "Schedule Delivery",
      icon: "mdi-truck-delivery-outline"
    },
    {
    path: "/delivery-requests/all",
    name: "All Delivery Requests",
    icon: "mdi-truck-check"
    },
    ],
  3: [
    {
    path: "/dashboard",
    name: "Dashboard",
    icon: "mdi-view-dashboard"
    },
    {
      path: "/delivery-requests/courier/",
      name: "Assigned Delivery Requests",
    icon: "mdi-truck"
    }
  ],
}

</script>

<template>
  <v-card class="left" style="height: 834px" v-if="user!=null">
    <v-layout style="height: 100%;">
      <v-navigation-drawer
        class="bg-deep-purple"
        theme="dark"
        permanent
      >
        <v-list color="transparent">
          <v-list-item v-for="(item,index) in routes[user.role_id]" :key="index" :prepend-icon="item.icon" :title="item.name" :to="item.path"></v-list-item>
        </v-list>
        <template v-slot:append v-if="user !=null">
               <div class="mx-auto text-center">
              <v-avatar color="accent">
                <span class="white--text text-h5">{{
                  `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                }}</span>
              </v-avatar>
              <h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout()"> Logout </v-btn>
            </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 400px"></v-main>
    </v-layout>
  </v-card>
</template>
