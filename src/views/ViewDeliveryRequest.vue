<script setup>
import { onMounted, watch, toRef } from "vue";
import { useRouter } from "vue-router";
import DeliveryRequestServices from "../services/DeliveryRequestServices.js";
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common"

const props = defineProps({
  deliveryRequest: Object,
});
const deliveryRequest = toRef(props, 'deliveryRequest');
const isLoading = ref(true);
const user = ref(null);
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const router = useRouter()

onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  if(!user.value) {
    router.push({ name: "login" });
  }
  await getDeliveryRequest();
  isLoading.value = false;
});

async function getDeliveryRequest() {
  await DeliveryRequestServices.getDeliveryRequest(router.currentRoute.value.params.id)
    .then((res) => {
      deliveryRequest.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteDeliveryRequest = async() => {
    await DeliveryRequestServices.deleteDeliveryRequest(deliveryRequest.value.id)
    .then((res) => {
      snackbar.value = updateSnackBar("DeliveryRequest is deleted successfully!","green")
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = updateSnackBar(error.response.data.message)
    });
}
const pickitup = async() => {
    await DeliveryRequestServices.pickitup(deliveryRequest.value.id)
    .then((res) => {
      snackbar.value = updateSnackBar("DeliveryRequest is pickeup successfully!","green")
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = updateSnackBar(error.response.data.message)
    });
}
const delivered = async() => {
    await DeliveryRequestServices.delivered(deliveryRequest.value.id)
    .then((res) => {
      snackbar.value = updateSnackBar("DeliveryRequest is delivered successfully!","green")
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = updateSnackBar(error.response.data.message)
    });
}
</script>

<template>
<v-container>
  <div style="margin-top: 20px;margin-left:30px;margin-right:30px">
    <div style="display: flex; justify-content: center;">
      <h3>DeliveryRequest Details</h3>
    </div>
    <br/>
    <Loader v-if="isLoading" />
     <div class="col-md-12 elevation-4 deliveryRequests" v-else>
        <div class="flex">
            <v-table class="table" style="background-color: #FFFFFF;">
                <tr>
                <th>DeliveryRequest Id</th>
                <td>{{ deliveryRequest.id }}</td>
                </tr>
                <tr>
                <th>Status</th>
                <td>{{ deliveryRequest.delivery_status }}</td>
                </tr>
                <tr>
                <th>Pick up Address</th>
                <td>{{ deliveryRequest.pickup_address }}</td>
                </tr>
                <tr>
                <th>Delivery Address</th>
                <td>{{ deliveryRequest.delivery_address }}</td>
                </tr>
                <tr>
                <th>Price</th>
                <td> {{ deliveryRequest.price }}</td>
                </tr>
                <tr>
                <th>Distance</th>
                <td> {{ deliveryRequest.distance }} miles</td>
                </tr>
                <tr v-if="deliveryRequest.courier_bonus">
                <th>Courier Bonus</th>
                <td> {{ deliveryRequest.courier_bonus }} points</td>
                </tr>
                <tr>
                <th>Average time for Delivery </th>
                <td> {{ deliveryRequest.average_time }}</td>
                </tr>
                <tr>
                 <th>Created At</th>
                <td> {{ deliveryRequest.createdAt }} </td>
                </tr>
                <tr v-if="deliveryRequest.pickedup_date_time" >
                 <th>Picked up At</th>
                <td> {{ deliveryRequest.pickedup_date_time }} </td>
                </tr>
                <tr v-if="deliveryRequest.delivered_date_time" >
                 <th>Delivered At</th>
                <td> {{ deliveryRequest.delivered_date_time }} </td>
                </tr>
                <tr v-if="deliveryRequest.deliveredInTime" >
                 <th>Delivered in time</th>
                <td> {{ deliveryRequest.deliveredInTime }} </td>
                </tr>
                 <tr v-if="deliveryRequest.customer_details" >
                 <th>Customer Details</th>
                <td> 
                    <p> Name - {{ deliveryRequest.customer_details.first_name}} {{ deliveryRequest.customer_details.last_name}} <br/>
                     Email - {{ deliveryRequest.customer_details.email}} <br/>
                     Mobile - {{ deliveryRequest.customer_details.mobile}} <br/>
                     Address - {{ deliveryRequest.customer_details.address}} <br/>
                     Apt Number - {{ deliveryRequest.customer_details.apartment_number}} </p>
                </td>
                </tr>
                <tr>
                <th v-if="deliveryRequest.placed_by_details">Clerk Details</th>
                <td> 
                    <p> Name - {{ deliveryRequest.placed_by_details.firstName}} {{ deliveryRequest.placed_by_details.lastName}} <br/>
                     Email - {{ deliveryRequest.placed_by_details.email}} <br/>
                     Mobile - {{ deliveryRequest.placed_by_details.mobile}} <br/>
                    </p>
                </td>
                </tr>
                <tr v-if="deliveryRequest.courier_details">
                <th>Courier Details</th>
                <td> 
                    <p> Name - {{ deliveryRequest.courier_details.name}} <br/>
                     Email - {{ deliveryRequest.courier_details.email}} <br/>
                     Contact - {{ deliveryRequest.courier_details.contact}} <br/>
                    </p>
                </td>
                </tr>
                <tr v-if="user.role_id =='3' && !deliveryRequest.delivered_date_time ">
                    <th>Actions</th>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                             <v-btn variant="flat" color="primary" style="margin-right:10px;" v-if="!deliveryRequest.pickedup_date_time" @click="pickitup()">Pick it up</v-btn>
                            <v-btn variant="flat" color="primary" v-if="!deliveryRequest.delivered_date_time" @click="delivered()">Delivered</v-btn>
                        </div> 
                    </td>
                </tr>

                
            </v-table>

        </div>
    </div>
  </div>
  <ViewSnackBar :snackbar="snackbar"/>
  <br/>
</v-container>

</template>

<style scoped>
.table {
    margin: 40px 40px 40px 40px;
    border: 2px solid black;
}
.deliveryRequests {
    padding: 30px;
}
th,td {
    border-bottom: 2px solid black;
    padding: 10px;
}
</style>