<script setup>
import { onMounted, watch, toRef } from "vue";
import { useRouter } from "vue-router";
import DeliveryRequestServices from "../services/DeliveryRequestServices.js";
import { ref } from "vue";
import Loader from "../components/Loader.vue";
import ViewSnackBar from "../components/ViewSnackBar.vue";
import { updateSnackBar } from "../common"
import html2pdf from 'html2pdf.js';

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

const download = () =>{
  const invoice = deliveryRequest.value
      const pdfFormat = `
         <html>
        <head>
          <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          table {
              width: 80%;
          }
          td {
              width: 80%;
              padding: 10px;
          }
          th {
              padding-left: 10px;
          }
          .flex {
              display: flex;
              justify-content: space-around;
          }
          </style>
        </head>
        <body>
          <h4>Invoice for Order ID: ${invoice.id}</h4>
          <div class="flex">
          <table>
                <tr>
                <th>Price to Deliver</th>
                <td> ${ invoice.price}</td>
                </tr>
                <tr>
                <tr>
                <th>Price to Deliver</th>
                <td> ${ invoice.delivery_status}</td>
                </tr>
                <tr>
                <th>Distance</th>
                <td> ${ invoice.distance } Miles</td>
                </tr>
                <tr>
                <th>Order Created At</th>
                <td> ${ invoice.createdAt } </td>
                </tr>
                <tr>
                <th>Picked up At</th>
                <td> ${ invoice.pickedup_date_time } </td>
                </tr>
                <tr>
                 <th>Delivered in time</th>
                <td> ${ invoice.delivered_date_time } </td>
                </tr>
                 <tr>
                 <th>Customer Details</th>
                <td> 
                    <p> Name - ${ invoice.customer_details.name}<br/>
                     Email - ${ invoice.customer_details.email} <br/>
                    Mobile - ${ invoice.customer_details.contact}
                </td>
                </tr>
            </table>
            </div>
        </body>
      </html>
      `;

      const options = {
        margin: [10, 10],
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas: { scale: 2 }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // Generate the PDF from the HTML content
      html2pdf().from(pdfFormat).set(options).save();
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
                    <p> Name - {{ deliveryRequest.customer_details.name}}<br/>
                     Email - {{ deliveryRequest.customer_details.email}} <br/>
                     Mobile - {{ deliveryRequest.customer_details.contact}} <br/>
                     Address - {{ deliveryRequest.customer_details.avenue }} Avenue, {{ deliveryRequest.customer_details.avenue }} Street <br/></p>
                </td>
                </tr>
                <tr>
                <th v-if="deliveryRequest.placed_by_details">Clerk Details</th>
                <td> 
                    <p> Name - {{ deliveryRequest.placed_by_details.firstName}} {{ deliveryRequest.placed_by_details.lastName}} <br/>
                     Email - {{ deliveryRequest.placed_by_details.email}} <br/>
                    </p>
                </td>
                </tr>
                <tr v-if="deliveryRequest.courier_details">
                <th>Courier Details</th>
                <td> 
                    <p> Name - {{ deliveryRequest.courier_details.firstName}} {{ deliveryRequest.courier_details.lastName}} <br/>
                     Email - {{ deliveryRequest.courier_details.email}} <br/>
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
                <tr v-if="deliveryRequest.delivered_date_time ">
                <th>Invoice</th>
                <td> 
                  <v-btn variant="flat" color="primary" style="margin-right:10px;" @click="download()">Click here to download</v-btn>
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