<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import CourierServices from "../services/CourierServices.js";
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common"
import CreateCourier from "./CreateCourier.vue"
import UpdateCourier from "./UpdateCourier.vue"

const couriers = ref([]);
const loader = ref(true);
const user = ref(null);
const router = useRouter();
const type = router.currentRoute.value.params.type
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const createDialog = ref(false)
const updateDialogs = ref([])
onMounted(async () => {
   user.value = JSON.parse(localStorage.getItem("user"));
  if(!user.value) {
    router.push({ name: "login" });
  }
  await getCouriers();
  loader.value = false;
});

async function getCouriers() {
  await CourierServices.getCouriers()
    .then((res) => {
      couriers.value = res.data;
      updateDialogs.value = new Array(res.data.length).fill(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteCourier = async(id,index) => {
  await CourierServices.deleteCourier(id)
    .then((res) => {
      couriers.value.splice(index, 1);
      snackbar.value = updateSnackBar("Courier is deleted successfully!","green")
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
        Create Courier
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
          <v-toolbar-title>Create Courier</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <CreateCourier />
      </v-card>
    </v-dialog>
  </v-row>
    <div style="display: flex; justify-content: center;">
      <h2>Couriers</h2>
    </div>
    <br/>
    <Loader v-if="loader" />
    <div class="col-md-12 container elevation-4 couriers" v-else-if="couriers.length != 0">
             <v-table class="table" style="background-color: #FFFFFF;" height="450px">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(courier,index) in couriers" :key="index" >
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ courier.name }}</td>
                    <td>{{ courier.contact }}</td>
                    <td>{{ courier.email }}</td>
                    <td>
                        <div class="btn-group" role="group">
                             <v-dialog v-model="updateDialogs[index]" fullscreen  :scrim="false"  transition="dialog-bottom-transition" >
                                <template v-slot:activator="{ props }">
                                    <v-btn class="ma-2" color="primary" style="margin-left:auto;" v-bind="props"> Update</v-btn>
                                </template>
                                <v-card>
                                    <v-toolbar dark color="primary">
                                    <v-btn icon dark @click="updateDialogs[index] = false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>Update Courier</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <UpdateCourier :courier="courier" />
                                </v-card>
                                </v-dialog>
                            <v-btn class="ma-2" color="secondary" style="margin-left:auto;" @click="deleteCourier(courier.id,index)"> Delete</v-btn>
                        </div>         
                    </td>
                    </tr>
                </tbody>
                </v-table>
          </div>
      <div class="text-center" v-else>
      <h4 class="text-primary">No Couriers are available</h4> 
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
.couriers {
  padding: 30px;
  background-color: #FFFFFF;
}
.btn-danger {
  margin-left: 20px;
}
.couriers{
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