<template>
    <div class="track-delivery">
      <h1>Tracking Page</h1>
      <form @submit.prevent="submitTracking">
        <input type="text" v-model="trackingNumber" placeholder="Enter Tracking Number" maxlength="10" />
        <button type="submit">Track</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="trackingResult" class="tracking-result">
        <h2>Tracking Result:</h2>
        <p>Tracking Number: {{ trackingResult.trackingNumber }}</p>
        <p>Status: {{ trackingResult.status }}</p>
        <p>Location: {{ trackingResult.location }}</p>
        <!-- Display other tracking details as needed -->
      </div>
    </div>
  </template>
  
  <script>
  import TrackService from "../services/TrackService.js";
  
  export default {
    data() {
      return {
        trackingNumber: "",
        errorMessage: "",
        trackingResult: null,
      };
    },
    methods: {
      async submitTracking() {
        try {
          this.errorMessage = "";
          this.trackingResult = null;
  
          // Call the trackDelivery method from your service
          const result = await TrackService.trackDelivery(this.trackingNumber);
          this.trackingResult = result;
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .track-delivery {
    text-align: center;
    margin-top: 20px;
  }
  
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  
  input[type="text"] {
    padding: 10px;
    font-size: 16px;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  .tracking-result {
    margin-top: 20px;
  }
  </style>
  