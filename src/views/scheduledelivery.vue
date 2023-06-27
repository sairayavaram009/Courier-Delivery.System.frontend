<template>
  <div class="schedule-delivery">
    <h1>Schedule Delivery</h1>
    <form @submit.prevent="submitSchedule">
      <!-- form fields -->
      <div>
        <label>From Address:</label>
        <input type="text" v-model="fromAddress" />
      </div>
      <div>
        <label>To Address:</label>
        <input type="text" v-model="toAddress" />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" v-model="name" />
      </div>
      <div>
        <label>Contact Number:</label>
        <input type="text" v-model="contactNumber" />
      </div>
      <button type="submit">Schedule</button>
    </form>

    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
<script>
export default {
  // Component code
  
  data() {
    return {
      errorMessage: "" // Variable to store the error message
    };
  },
  
  methods: {
    submitSchedule() {
      // Retrieve the form data
      
      // Same code as before
      
      fetch("your-backend-api-url", {
        // Same code as before
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the backend
          console.log("Response from backend:", data);

          // If the backend processed the data successfully, you can display a success message or perform any other actions

          // If the backend encountered an error, you can display an error message or handle the error accordingly
          if (data.error) {
            this.errorMessage = data.error; // Set the error message from the backend response
          } else {
            this.errorMessage = ""; // Clear the error message if there was no error
          }
        })
        .catch(error => {
          // Handle any errors that occurred during the API request
          console.error("Error:", error);
          this.errorMessage = "An error occurred during scheduling. Please try again later."; // Set a generic error message
        });
    }
  }
};
</script>



  
  
  <style scoped>
  .schedule-delivery {
    text-align: center;
    margin-top: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  textarea,
  input[type="text"],
  input[type="tel"] {
    padding: 10px;
    font-size: 16px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  </style>
  