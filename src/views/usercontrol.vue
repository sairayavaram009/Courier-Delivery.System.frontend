<template>
    <div class="user-control">
      <h1>User Control</h1>
      <table class="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Permissions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>
              <select v-model="user.permissions">
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="delivery">Delivery Boy</option>
              </select>
            </td>
           
            
            
  <script>
  import UserServices from "../services/UserServices";
  
  export default {
    data() {
      return {
        users: [],
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        UserServices.getUsers()
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.error("Error retrieving users:", error);
          });
      },
      editUser(user) {
        UserServices.editUserPermissions(user.id, user.permissions)
          .then(() => {
            console.log("User updated successfully");
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      },
      savePermissions() {
        UserServices.saveUserPermissions(this.users)
          .then(() => {
            console.log("Permissions saved successfully");
          })
          .catch((error) => {
            console.error("Error saving permissions:", error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .user-control {
    margin-top: 20px;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 12px 20px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .edit-button {
    padding: 6px 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .save-button {
    margin-top: 20px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  select {
    padding: 6px 10px;
    border-radius: 4px;
  }
  </style>
  