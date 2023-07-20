<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import CompanyServices from "../services/CompanyServices.js";
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
const company = ref({
  name: "",
  contact: "",
  email: "",
});
const user = ref(null);
const isLoader = ref(false);
const avenue = [1,2,3,4,6,7]
const street = ["A","B","C","D","E","F","G"]

onMounted(async () => {
    user.value = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));
        if(!isLoggedIn) {
        router.push({ name: "login" });
    }
});

async function addCompany() {
  if(company.value.name === "") {
      snackbar.value = updateSnackBar("Name is Empty")
  }
  else if(company.value.contact === "") {
    snackbar.value = updateSnackBar("Contact Number is empty")
  }
  else if(company.value.email === "") {
    snackbar.value = updateSnackBar("Email is empty")
  }
  else {
    isLoader.value = true
    await CompanyServices.addCompany({...company.value})
        .then((response) => {
            snackbar.value = updateSnackBar("Company is created successfully!","green")
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
          <v-card-title class="headline mb-2">Create Company </v-card-title>
        </div>
        <Loader v-if="isLoader" />
        <v-card-text v-else>
          <TextField class="md-3" id="name" title="Name" :value="company.name" @update:value="company.name = $event"/>
          <TextField class="md-3" id="contact" title="Contact Number" :value="company.contact" @update:value="company.contact = $event"/>
          <TextField class="md-3" id="email" title="Email" :value="company.email" @update:value="company.email = $event"/>
            <label>Select Street </label>
            <select v-model="company.street" class="custom-select">
            <option v-for="(item,index) in street" :key="index" :value="item"> {{ item }} Street</option>
            </select>
            <label>Select Avenue </label>
            <select v-model="company.avenue" class="custom-select">
            <option v-for="(item,index) in avenue" :key="index" :value="item"> {{ item }} Avenue</option>
            </select>
          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addCompany()">Create</v-btn>
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
.custom-select {
  background-color: #f0f0f0;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
}
</style>