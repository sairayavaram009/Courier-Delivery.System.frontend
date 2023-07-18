<script setup>
import { ref, onMounted } from 'vue';
import DeliveryRequestServices from '../services/DeliveryRequestServices.js';
import CustomerServices from '../services/CustomerServices.js';
import TextField from "../components/TextField.vue"

const user = ref(null);
const snackbar = ref({
  value: false,
  color: '',
  text: '',
});
const delivery_request = ref({
  pickup_address: '',
  delivery_address: '',
  pickup_date_time: '',
  price: '',
  average_time: '',
  distance: '',
  customer_id: ""
})
const customers = ref([])
const avenue = [1,2,3,4,6,7]
const street = ["A","B","C","D","E","F","G"]
const addresses = avenue.flatMap((item) => street.map((item1) =>  "Avenue "+item+" Street "+item1));
onMounted(async () => {
  await getCustomers()
  user.value = JSON.parse(localStorage.getItem('user'));
});
const getCustomers = async() => {
  await CustomerServices.getCustomers()
    .then((response) => {
      customers.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
function closeSnackBar() {
  snackbar.value.value = false;
}
const scheduleRequest = async() => {
  await DeliveryRequestServices.addDeliveryRequest({...delivery_request.value,placed_by: user.value.id, company_id: 1})
        .then((response) => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = "Scheduled Delivery successfully!";
            console.log("response",response)
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message || "error while scheduling delivery";
        });
}

const estimateCost = async() => {
   await DeliveryRequestServices.estimateCost({pickup_street: delivery_request.value.pickup_address.charAt(7),pickup_avenue: delivery_request.value.pickup_address.charAt(16),delivery_street: delivery_request.value.delivery_address.charAt(7),delivery_avenue:delivery_request.value.delivery_address.charAt(16)})
        .then((response) => {
            const res = response.data
            delivery_request.value = {...delivery_request.value,price: res.price,average_time: res.average_time,distance: res.distance}
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = "Estimated the cost successfully!"+JSON.stringify(response.data);
            console.log("response",response)
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message || "error while scheduling delivery";
        });
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10"
          ><v-card-title class="pl-0 text-h4 font-weight-bold"
            >Schedule Delivery
          </v-card-title>
        </v-col>
      </v-row>
        <select v-model="delivery_request.pickup_address" class="custom-select">
          <option value=""> Select Pickup Address </option>
          <option v-for="(address,index) in addresses" :key="index" :value="address"> {{ address }}</option>
        </select>
        <select v-model="delivery_request.delivery_address" class="custom-select">
          <option value=""> Select Delivery Address </option>
          <option v-for="(address,index) in addresses" :key="index" :value="address"> {{ address }}</option>
        </select>
        <select v-model="delivery_request.customer_id" class="custom-select">
          <option value=""> Select Customer </option>
          <option v-for="customer in customers" :key="customer.id" :value="id"> {{ customer.name }}</option>
        </select>
        <label> Select Pickup Date and Time</label>
        <input type="datetime-local" class="custom-select" v-model="delivery_request.pickup_date_time" style="margin-top:10px;" />
        <v-btn variant="flat" color="primary" @click="estimateCost()"
            >Estimate Cost</v-btn
          >
        <div v-if="delivery_request.price" style="margin-top:10px">
            <v-list lines="one">
            <v-list-item  title="Price" :subtitle="delivery_request.price"></v-list-item>
            <v-list-item  title="Time For Delivery" :subtitle="delivery_request.average_time"></v-list-item>
            <v-list-item  title="Distance" :subtitle="delivery_request.distance"></v-list-item>
            </v-list>
            <v-btn variant="flat" color="primary" @click="scheduleRequest()" style="margin-top:10px;"
            >Schedule</v-btn>
        </div>

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
.schedule-delivery {
  text-align: center;
  margin-top: 20px;
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