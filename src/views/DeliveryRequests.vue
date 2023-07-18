<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import DeliveryRequestServices from "../services/DeliveryRequestServices.js";
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common"
import ScheduleDelivery from "./Scheduledelivery.vue"
import UpdateDeliveryRequest from "./UpdateDeliveryRequest.vue"

const requests = ref([]);
const loader = ref(true);
const user = ref(null);
const router = useRouter();
const filter = router.currentRoute.value.params.filter
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const backup = ref([])
const createDialog = ref(false)
const updateDialog = ref(false)
onMounted(async () => {
   user.value = JSON.parse(localStorage.getItem("user"));
  if(!user.value) {
    router.push({ name: "login" });
  }
  await getRequests();
  loader.value = false;
});

async function getRequests() {
  await DeliveryRequestServices.getDeliveryRequests(filter,user.value.id)
    .then((res) => {
      requests.value = res.data;
      backup.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteDeliveryRequest = async(id,index) => {
  await DeliveryRequestServices.deleteDeliveryRequest(id)
    .then((res) => {
      requests.value.splice(index, 1);
      snackbar.value = updateSnackBar("Request is deleted successfully!","green")
    })
    .catch((error) => {
      console.log(error);
      snackbar.value = updateSnackBar(error.response.data.message)
    });
}
</script>

<template>
<v-container>
  <div class="container" style="margin-top: 10px">
     <v-row justify="end">
    <v-dialog
      v-model="createDialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
         <v-btn
        class="ma-2"
        color="primary"
        style="margin-left:auto;"
        v-bind="props"
      >
        <v-icon
          start
          icon="mdi-plus-circle"
        ></v-icon>
        Schedule Delivery
      </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="createDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Schedule Delivery Request</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <ScheduleDelivery />
      </v-card>
    </v-dialog>
  </v-row>
    <div style="display: flex; justify-content: center;">
      <h2>All Requests</h2>
    </div>
    <br/>
    <Loader v-if="loader" />
    <div class="col-md-12 container elevation-4 requests" v-else-if="requests.length != 0">
             <v-table class="table" style="background-color: #FFFFFF;" height="450px">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col"> Customer </th>
                    <th scope="col">Pick up Date</th>
                    <th scope="col">Pickup Address</th>
                    <th scope="col">Delivery Address</th>
                    <th scope="col">Cost</th>
                    <th scope="col">Distance</th>
                    <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(request,index) in requests" :key="index" >
                    <th scope="row">{{ index+1 }}</th>
                    <td> {{ request.placed_by_details.firstName }} {{ request.placed_by_details.lastName }}</td>
                    <td>{{ request.pickup_date_time }}</td>
                    <td>{{ request.pickup_address }}</td>
                    <td>{{ request.delivery_address }}</td>
                    <td> {{ request.price }} </td>
                    <td> {{ request.distance }} </td>
                    <td>
                        <div class="btn-group" role="group">
                             <v-dialog v-model="updateDialog" fullscreen  :scrim="false"  transition="dialog-bottom-transition" >
                                <template v-slot:activator="{ props }">
                                    <v-btn class="ma-2" color="primary" style="margin-left:auto;" v-bind="props"> Update</v-btn>
                                </template>
                                <v-card>
                                    <v-toolbar dark color="primary">
                                    <v-btn icon dark @click="updateDialog = false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>Update Delivery Request</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <UpdateDeliveryRequest :request="request" />
                                </v-card>
                                </v-dialog>
                            <v-btn class="ma-2" color="secondary" style="margin-left:auto;" @click="deleteDeliveryRequest(request.id,index)"> Delete</v-btn>
                        </div>         
                    </td>
                    </tr>
                </tbody>
                </v-table>
          </div>
      <div class="text-center" v-else>
      <h4 class="text-primary">No Delivery Requests are available</h4> 
    </div>
    </div>
    <ViewSnackBar :snackbar="snackbar"/>
  <br/>
</v-container>

</template>

<style scoped>

.getplan {
    color: #FFFFFF;
    background-color: #80162B;
}
.requests {
  padding: 30px;
  background-color: #FFFFFF;
}
.btn-danger {
  margin-left: 20px;
}
.requests{
  margin-top: 20px;
  margin-bottom: 20px;
}
.add {
    background-color: #1E73BE ;
    margin-left: 20px;
    padding-top: -10px;
    color: #FFFFFF;
}
.update {
  background-color: #1E73BE;
  color: #FFFFFF;
}
.delete {
  background-color: #dc3545;
  color: #FFFFFF;
}
.search {
  margin-left: 70%;
  width: 30%;
}
</style>