<script setup>
import MenuBar from "../src/components/MenuBar.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
});
</script>

<template>
  <v-app :style="{ background: '#F4F4F4' }">
    <div style="display: flex">
    <MenuBar :key="$route.fullPath" v-if="user != null" />
    <v-main>
      <router-view />
    </v-main>
    </div>
  </v-app>
</template>
