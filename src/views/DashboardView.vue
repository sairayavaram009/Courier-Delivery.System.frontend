<template>
    <div class="dashboard">
      <h1>Welcome to the Dashboard</h1>
      <p>This is the dashboard view of your application.</p>
  
      <div class="buttons">
        <router-link to="/scheduling" class="button">Schedule Delivery</router-link>
        <router-link to="/user-control" class="button">User Control</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardView',
  };
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .buttons {
    margin-top: 20px;
  }
  
  .button {
    display: inline-block;
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #0056b3;
  }
  </style>
  