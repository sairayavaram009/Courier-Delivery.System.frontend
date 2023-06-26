<template>
    <div>
      <h1>Profile Settings</h1>
      <form @submit="updateProfile">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="user.firstName" required>
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="user.lastName" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        }
      };
    },
    methods: {
      updateProfile() {
        // Call your API or perform the necessary actions to update the user's profile
        // You can access the updated user data using `this.user` in this method
        console.log("Profile updated:", this.user);
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  form {
    display: grid;
    grid-gap: 8px;
    max-width: 300px;
  }
  label {
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 4px;
  }
  button {
    padding: 8px 16px;
  }
  </style>
  