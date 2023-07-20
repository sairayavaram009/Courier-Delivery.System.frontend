<script setup>
import { onMounted } from "vue";
import { ref, toRaw, defineProps, toRef,watch } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import CompanyServices from "../services/CompanyServices.js";
import Loader from "../components/Loader.vue";
import TextField from "../components/TextField.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common";


const props = defineProps({
  company: Object,
});
const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const company = toRef(props, 'company');

console.log(company.value);
const isLoader = ref(false);
onMounted(async () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
    if(!isLoggedIn) {
    router.push({ name: "login" });
  }
});


async function addCompany() {
  if(company.value.name === "") {
      snackbar.value = updateSnackBar("First Name is Empty")
  }
  else if(company.value.contact === "") {
    snackbar.value = updateSnackBar("Last name is empty")
  }
  else if(company.value.email === "") {
    snackbar.value = updateSnackBar("Email is empty")
  }
  else if(company.value.street === "") {
    snackbar.value = updateSnackBar("Street is empty")
  }
 else if(company.value.avenue === "") {
    snackbar.value = updateSnackBar("Avenue is empty")
  }
  else {
    isLoader.value = true
    await CompanyServices.updateCompany({...company.value})
        .then((response) => {
            snackbar.value = updateSnackBar("Company is updated successfully!","green")
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
          <v-card-title class="headline mb-2">Update Company </v-card-title>
        </div>
        <Loader v-if="isLoader" />
        <v-card-text v-else>
          <TextField class="md-3" id="name" title="Name" :value="company.name" @update:value="company.name = $event"/>
          <TextField class="md-3" id="contact" title="Contact Number" :value="company.contact" @update:value="company.contact = $event"/>
          <TextField class="md-3" id="email" title="Email" :value="company.email" @update:value="company.email = $event"/>
          <TextField class="md-3" id="street" title="Street" :value="company.street" @update:value="company.street = $event"/>
          <TextField class="md-3" id="avenue" title="Avenue" :value="company.avenue" @update:value="company.avenue = $event"/>

          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="addCompany()">Update</v-btn>
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