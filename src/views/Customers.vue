<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import CustomerServices from "../services/CustomerServices.js";
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common"
import CreateCustomer from "./CreateCustomer.vue"
import UpdateCustomer from "./UpdateCustomer.vue"

const customers = ref([]);
const loader = ref(true);
const user = ref(null);
const router = useRouter();
const type = router.currentRoute.value.params.type
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
  await getCustomers();
  loader.value = false;
});

async function getCustomers() {
  await CustomerServices.getCustomers()
    .then((res) => {
      customers.value = res.data;
      backup.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteCustomer = async(id,index) => {
  await CustomerServices.deleteCustomer(id)
    .then((res) => {
      customers.value.splice(index, 1);
      snackbar.value = updateSnackBar("Customer is deleted successfully!","green")
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
        Create Customer
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
          <v-toolbar-title>Create Customer</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <CreateCustomer />
      </v-card>
    </v-dialog>
  </v-row>
    <div style="display: flex; justify-content: center;">
      <h2>Customers</h2>
    </div>
    <br/>
    <Loader v-if="loader" />
    <div class="col-md-12 container elevation-4 customers" v-else-if="customers.length != 0">
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
                    <tr v-for="(customer,index) in customers" :key="index" >
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.contact }}</td>
                    <td>{{ customer.email }}</td>
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
                                    <v-toolbar-title>Update Customer</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <UpdateCustomer :customer="customer" />
                                </v-card>
                                </v-dialog>
                            <v-btn class="ma-2" color="secondary" style="margin-left:auto;" @click="deleteCustomer(customer.id,index)"> Delete</v-btn>
                        </div>         
                    </td>
                    </tr>
                </tbody>
                </v-table>
          </div>
      <div class="text-center" v-else>
      <h4 class="text-primary">No Customers are available</h4> 
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
.customers {
  padding: 30px;
  background-color: #FFFFFF;
}
.btn-danger {
  margin-left: 20px;
}
.customers{
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