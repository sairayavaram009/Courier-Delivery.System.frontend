<script setup>
import { onMounted } from "vue";
import { ref, toRaw, defineProps, toRef,watch } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import DeliveryRequestServices from "../services/DeliveryRequestServices.js";
import Loader from "../components/Loader.vue";
import TextField from "../components/TextField.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common";


const props = defineProps({
  deliveryRequest: Object,
  couriers: Object
});
const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const couriers = toRef(props, 'couriers');
const deliveryRequest = toRef(props, 'deliveryRequest');

console.log("delivery requets",deliveryRequest.value)
console.log(deliveryRequest.value);
const isLoader = ref(false);
onMounted(async () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("user"));
    if(!isLoggedIn) {
    router.push({ name: "login" });
  }
});


async function updateDeliveryRequest() {
  if(deliveryRequest.value.name === "") {
      snackbar.value = updateSnackBar("First Name is Empty")
  }
  else if(deliveryRequest.value.contact === "") {
    snackbar.value = updateSnackBar("Last name is empty")
  }
  else if(deliveryRequest.value.email === "") {
    snackbar.value = updateSnackBar("Email is empty")
  }
  else {
    isLoader.value = true
    await DeliveryRequestServices.updateDeliveryRequest({...deliveryRequest.value})
        .then((response) => {
            snackbar.value = updateSnackBar("DeliveryRequest is updated successfully!","green")
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
          <v-card-title class="headline mb-2">Update DeliveryRequest </v-card-title>
        </div>
        <Loader v-if="isLoader" />
        <v-card-text v-else>
        <label>Assign Courier </label>
        <select v-model="deliveryRequest.courier_id" class="custom-select">
        <option value=""> Assign Courier </option>
        <option v-for="(courier,index) in couriers" :key="index" :value="courier.id"> {{ courier.email }}</option>
        </select>
          <TextField class="md-3" id="pickup" title="Pickup Address" :value="deliveryRequest.pickup_address" @update:value="deliveryRequest.pickup_address = $event"/>
          <TextField class="md-3" id="delivery" title="Delivery Address" :value="deliveryRequest.delivery_address" @update:value="deliveryRequest.delivery_address = $event"/>
          <TextField class="md-3" id="status" title="Status" :value="deliveryRequest.delivery_status" @update:value="deliveryRequest.delivery_status = $event"/>
          <TextField class="md-3" id="status" title="Average Time for Delivery" :value="deliveryRequest.average_time" @update:value="deliveryRequest.average_time = $event"/>
          <TextField class="md-3" id="status" title="Price for Delivery" :value="deliveryRequest.price" @update:value="deliveryRequest.price = $event"/>
          <TextField class="md-3" id="status" title="Pick up Date and Time" :value="deliveryRequest.pickup_date_time" @update:value="deliveryRequest.pickup_date_time = $event"/>
          <div style="margin-top:10px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="updateDeliveryRequest()">Update</v-btn>
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
.schedule-delivery {
  text-align: center;
  margin-top: 20px;
}
.custom-select {
  background-color: #f0f0f0;
  padding: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
  height: 50px;
}
</style>