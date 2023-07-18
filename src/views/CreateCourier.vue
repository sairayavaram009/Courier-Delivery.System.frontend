<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import CourierServices from "../services/CourierServices.js";
import Loader from "../components/Loader.vue";
import TextField from "../components/TextField.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const courier = ref({
  name: "",
  contact: "",
  email: "",
});
const user = ref(null);
const isLoader = ref(false);
onMounted(async () => {
    user.value = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));
        if(!isLoggedIn) {
        router.push({ name: "login" });
    }
});

async function addCourier() {
  if(courier.value.name === "") {
      snackbar.value = updateSnackBar("Name is Empty")
  }
  else if(courier.value.contact === "") {
    snackbar.value = updateSnackBar("Contact Number is empty")
  }
  else if(courier.value.email === "") {
    snackbar.value = updateSnackBar("Email is empty")
  }
  else {
    isLoader.value = true
    await CourierServices.addCourier({...courier.value,company_id: user.value.company_id || 1})
        .then((response) => {
            snackbar.value = updateSnackBar("Courier is created successfully!","green")
            isLoader.value = false
        })
        .catch((error) => {
            console.log(error);
            snackbar.value = updateSnackBar(error.response.data.message)
            isLoader.value = false
        });
  }
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <div style="display:flex;" class="heading">
          <v-card-title class="headline mb-2">Create Courier </v-card-title>
        </div>
        <Loader v-if="isLoader" />
        <v-card-text v-else>
          <TextField class="md-3" id="name" title="First Name" :value="courier.name" @update:value="courier.name = $event"/>
          <TextField class="md-3" id="contact" title="Contact Number" :value="courier.contact" @update:value="courier.contact = $event"/>
          <TextField class="md-3" id="email" title="Email" :value="courier.email" @update:value="courier.email = $event"/>
          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addCourier()">Create</v-btn>
        </v-card-actions>
      </v-card>
      <ViewSnackBar :snackbar="snackbar"/>
    </div>
  </v-container>
</template>

<style scoped>
.add {
  margin-right: 20px;
  height: 40px;
  margin-top: 5px;
}
.heading {
    margin-top: 10px;
    justify-content: space-between;
}
</style>