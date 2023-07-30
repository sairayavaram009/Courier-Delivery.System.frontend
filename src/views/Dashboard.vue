<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import DashboardServices from "../services/DashboardServices.js";
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import Bar from "../components/Bar.vue";
import Pie from "../components/Pie.vue";
import { updateSnackBar } from "../common"

const dashboard = ref(null)
const isLoading = ref(true);
const router = useRouter();
const user = ref(null);
const id = null
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const userChartData = ref([])
const requestsChartData = ref([])
onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
    if(!user.value) {
    router.push({ name: "login" });
  }
  await getReport();
  isLoading.value = false;
});

async function getReport() {
  await DashboardServices.getDashboard()
    .then((res) => {
        dashboard.value = res.data
        generateCharts(res.data)
    })
    .catch((error) => {
      console.log(error);
    });
}
const generateCharts = (data) => {
        getUsers(data)
        getDeliveryRequests(data)
}

const getDeliveryRequests = (data) =>{
    const requestLabels= ["Pending Requests","Progress Requests","Delivered Requests"];
    const requestData = [data.pendingRequestCount,data.progressRequestCount,data.deliveredRequestCount];
    requestsChartData.value = {
    labels: requestLabels,
    datasets: [
        {
        label: 'Delivery Requests',
        backgroundColor: '#673ab7',
        data: requestData
        }
    ]
    }
}
const getUsers = (data) =>{
    const userLabels= ["Admin","Clerk","Courier"];
    const userData = [data.adminCount,data.clerkCount,data.deliveryBoyCount];
    userChartData.value = {
    labels: userLabels,
    datasets: [
        {
        label: 'User List',
        backgroundColor: ['#673ab7', '#4065b0', '#e50914', '#DD1B16'],
        data: userData
        }
    ]
    }
}
</script>

<template>
<v-container>
  <div class="container" style="margin-top: 20px">
    <div style="display: flex;">
      <h2>Dashboard</h2>
    </div>
    <br/>
    <Loader v-if="isLoading" />
    <div class="dashboard" v-else-if="dashboard">
        <v-row align="start" no-gutters>
                <Pie :chartData="userChartData" />
            <v-col style="height:200px;width:50%;">
                <Bar :chartData="requestsChartData" />
            </v-col>
        </v-row>
        <v-table class="table" style="background-color: #FFFFFF;">
            <tr>
                <th>
                    Total Requests
                </th>
                <td>
                    {{ dashboard.requestCount }}
                </td>
            </tr>
              <tr>
                <th>
                    Delivered Requests
                </th>
                <td>
                    {{ dashboard.deliveredRequestCount }}
                </td>
            </tr>
              <tr>
                <th>
                   Delivered in Time
                </th>
                <td>
                    {{ dashboard.deliveryInTimeCount }}
                </td>
            </tr>
             <tr>
                <th>
                   Delivery Requests Amount
                </th>
                <td>
                   $ {{ dashboard.requestAmount }}
                </td>
            </tr>
                          <tr>
                <th>
                  Bonus for Courier Boys
                </th>
                <td>
                    {{ dashboard.courierBoyBonus }} points
                </td>
            </tr>
            <tr>
                <th>
                    Total Customers
                </th>
                <td>
                {{ dashboard.customerCount}}
                </td>
            </tr>
        </v-table>
    </div>
    <div class="text-center" v-else>
      <h4 class="text-muted">Unable to fetch data</h4>
      <hr/>
    </div>
  <ViewSnackBar :snackbar="snackbar"/>
  <br/>
  </div>
</v-container>
</template>

<style scoped>
.dashboard {
    background-color: white;
    padding: 30px;
}
.dashboard-static-data {
    display: flex;
    width: 40%;
    justify-content: space-between;
}
.static {
    margin-top: 40px;
}
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