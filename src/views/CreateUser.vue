<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
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
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role_id: ""
});
const loggedInUser = ref(null);
const isLoader = ref(false);
onMounted(async () => {
    loggedInUser.value = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));
        if(!isLoggedIn) {
        router.push({ name: "login" });
    }
});

async function addUser() {
  if(user.value.firstName === "") {
      snackbar.value = updateSnackBar("First Name is Empty")
  }
  else if(user.value.lastName === "") {
    snackbar.value = updateSnackBar("Last Name is empty")
  }
  else if(user.value.email === "") {
    snackbar.value = updateSnackBar("Email is empty")
  }
    else if(user.value.password === "") {
    snackbar.value = updateSnackBar("Password is empty")
  }
    else if(user.value.role_id === "") {
    snackbar.value = updateSnackBar("Role is empty")
  }
  else {
    isLoader.value = true
    await UserServices.addUser({...user.value,company_id: loggedInUser.value.company_id || 1, role_id: user.value.role_id == "ADMIN" ? 1 : 2})
        .then((response) => {
            snackbar.value = updateSnackBar("User is created successfully!","green")
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
          <v-card-title class="headline mb-2">Create User </v-card-title>
        </div>
        <Loader v-if="isLoader" />
        <v-card-text v-else>
          <TextField class="md-3" id="name" title="First Name" :value="user.firstName" @update:value="user.firstName = $event"/>
          <TextField class="md-3" id="contact" title="Last Name" :value="user.lastName" @update:value="user.lastName = $event"/>
          <TextField class="md-3" id="email" title="Email" :value="user.email" @update:value="user.email = $event"/>
           <TextField class="md-3" id="password" title="Password" :value="user.password" @update:value="user.password = $event"/>
          <v-select
            label="Select Role"
            v-model="user.role_id"
            :items="['ADMIN', 'CLERK']"
            ></v-select>
          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addUser()">Create</v-btn>
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