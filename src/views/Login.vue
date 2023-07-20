<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import CompanyServices from "../services/CompanyServices.js";

const router = useRouter();
const isCreateAccount = ref(false);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const role = ref("Courier Boy")
const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  mobile: "",
  company_id: 1
});
const companies = ref([])

const roleOptions =  [
        "Clerk","Courier Boy"
      ]

onMounted(async () => {
  if (localStorage.getItem("user") !== null) {
    router.push({ name: "dashboard" });
  }
  await getCompanies()
});

const getRoleId = () => {
  if(role.value === "Clerk") return 2
  if(role.value === "Courier Boy") return 3
  return 3
}

async function getCompanies() {
  await CompanyServices.getCompanies()
    .then((res) => {
      companies.value = res.data;
      updateDialogs.value = new Array(res.data.length).fill(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function createAccount() {
  await UserServices.addUser({...user.value, role_id: getRoleId()})
    .then((res) => {
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = "Account created successfully!";
      router.push({ name: "login" });
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

async function login() {
  console.log(user.value);
  await UserServices.loginUser(user)
    .then((data) => {
      window.localStorage.setItem("user", JSON.stringify(data.data));
      snackbar.value.value = true;
      snackbar.value.color = "green";
      snackbar.value.text = "Login successful!";
      router.push({ name: "dashboard" });
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
    });
}

function openCreateAccount() {
  isCreateAccount.value = true;
}

function closeCreateAccount() {
  isCreateAccount.value = false;
}

function closeSnackBar() {
  snackbar.value.value = false;
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Login </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Password"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="flat" color="secondary" @click="openCreateAccount()"
            >Create Account</v-btn
          >
          <v-spacer></v-spacer>

          <v-btn variant="flat" color="primary" @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>

      <v-dialog persistent v-model="isCreateAccount" width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Create Account </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="user.firstName"
              label="First Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.lastName"
              label="Last Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.phoneNumber"
              label="Mobile"
              required
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              label="Password"
              required
            ></v-text-field>
             <v-select
                v-model="role"
                label="Role"
                :items="roleOptions"
                required
              ></v-select>
            <div style="margin-top:10px"/>
            <label>Select Company</label>
            <select v-model="user.company_id" class="custom-select">
            <option v-for="(item,index) in companies" :key="index" :value="item.id"> {{ item.name }}</option>
            </select>
          <div style="margin-top:10px"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="flat"
              color="secondary"
              @click="closeCreateAccount()"
              >Close</v-btn
            >
            <v-btn variant="flat" color="primary" @click="createAccount()"
              >Create Account</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<style scoped>
.custom-select {
  background-color: #f0f0f0;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 100%;
  height: 50px;
}
</style>
