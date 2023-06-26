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

function hasAccess(allowedRoles) {
  if (user.value && user.value.role) {
    return allowedRoles.includes(user.value.role);
  }
  return false;
}
</script>

<template>
  <div>
    <v-app-bar color="primary" app dark>
      <router-link :to="{ name: 'recipes' }">
        <v-img
          class="mx-2"
          :src="logoURL"
          height="50"
          width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title class="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" :to="{ name: 'home' }">Home</v-btn>
      <v-btn class="mx-2" :to="{ name: 'recipes' }">Tours</v-btn>

      <v-btn v-if="hasAccess(['admin', 'cleark'])" class="mx-2" :to="{ name: 'createDelivery' }">
        Create Delivery Request
      </v-btn>
      <v-btn v-if="hasAccess(['admin', 'user', 'guest'])" class="mx-2" :to="{ name: 'trackDelivery' }">
        Track Delivery
      </v-btn>

      <v-btn v-if="hasAccess(['admin'])" class="mx-2" :to="{ name: 'profileSetting' }">
        Profile Settings
      </v-btn>

      <v-btn v-if="!user" class="mx-2" :to="{ name: 'login' }">Login</v-btn>
      <v-btn v-if="user" class="mx-2" @click="logout">Logout</v-btn>

      <v-menu v-if="user !== null" min-width="200px" rounded>
        <!-- ... -->
      </v-menu>
    </v-app-bar>
  </div>
</template>
