<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import CustomerServices from "../services/CustomerServices.js";
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
const customer = ref({
  name: "",
  contact: "",
  email: "",
});
const isLoader = ref(false);
onMounted(async () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
    if(!isLoggedIn) {
    router.push({ name: "login" });
  }
});

async function addCustomer() {
  if(customer.value.name === "") {
      snackbar.value = updateSnackBar("Name is Empty")
  }
  else if(customer.value.contact === "") {
    snackbar.value = updateSnackBar("Contact Number is empty")
  }
  else if(customer.value.email === "") {
    snackbar.value = updateSnackBar("Email is empty")
  }
  else {
    isLoader.value = true
    await CustomerServices.addCustomer({...customer.value})
        .then((response) => {
            snackbar.value = updateSnackBar("Customer is created successfully!","green")
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
          <v-card-title class="headline mb-2">Create Customer </v-card-title>
        </div>
        <Loader v-if="isLoader" />
        <v-card-text v-else>
          <TextField class="md-3" id="name" title="First Name" :value="customer.name" @update:value="customer.name = $event"/>
          <TextField class="md-3" id="contact" title="Contact Number" :value="customer.contact" @update:value="customer.contact = $event"/>
          <TextField class="md-3" id="email" title="Email" :value="customer.email" @update:value="customer.email = $event"/>
          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addCustomer()">Create</v-btn>
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