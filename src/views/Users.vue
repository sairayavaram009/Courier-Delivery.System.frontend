<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common"
import CreateUser from "./CreateUser.vue"
import UpdateUser from "./UpdateUser.vue"

const users = ref([]);
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
const updateDialogs = ref([])
onMounted(async () => {
   user.value = JSON.parse(localStorage.getItem("user"));
  if(!user.value) {
    router.push({ name: "login" });
  }
  await getUsers();
  loader.value = false;
});

async function getUsers() {
  await UserServices.getUsers()
    .then((res) => {
      users.value = res.data;
      updateDialogs.value = new Array(res.data.length).fill(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

const deleteUser = async(id,index) => {
  await UserServices.deleteUser(id)
    .then((res) => {
      users.value.splice(index, 1);
      snackbar.value = updateSnackBar("User is deleted successfully!","green")
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
        Create User
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
          <v-toolbar-title>Create User</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <CreateUser />
      </v-card>
    </v-dialog>
  </v-row>
    <div style="display: flex; justify-content: center;">
      <h2>Users</h2>
    </div>
    <br/>
    <Loader v-if="loader" />
    <div class="col-md-12 container elevation-4 users" v-else-if="users.length != 0">
             <v-table class="table" style="background-color: #FFFFFF;" height="450px">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in users" :key="index" >
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                     <td>{{ user.role_id == 1 ? "ADMIN" : "CLERK" }}</td>
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
                                    <v-toolbar-title>Update User</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                    <UpdateUser :user="user" />
                                </v-card>
                                </v-dialog>
                            <v-btn class="ma-2" color="secondary" style="margin-left:auto;" @click="deleteUser(user.id,index)"> Delete</v-btn>
                        </div>         
                    </td>
                    </tr>
                </tbody>
                </v-table>
          </div>
      <div class="text-center" v-else>
      <h4 class="text-primary">No Users are available</h4> 
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
.users {
  padding: 30px;
  background-color: #FFFFFF;
}
.btn-danger {
  margin-left: 20px;
}
.users{
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