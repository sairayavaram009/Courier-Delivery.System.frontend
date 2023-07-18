import apiClient from "./services";

export default {
  getUsers() {
    return apiClient.get("/users");
  },
  addUser(user) {
    return apiClient.post("/users", user);
  },
  loginUser(user) {
    console.log(user);
    return apiClient.post("/login", user.value, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        crossDomain: true,
        Authorization: "Basic " + btoa(user.value.email + ":" + user.value.password),
      },
    });
  },
  logoutUser() {
    return apiClient.post("/logout");
  },
  saveUserPermissions(users) {
    return apiClient.put("/users/permissions", users);
  },
  updateUser(user) {
    return apiClient.put("users/" + user.id, user);
  },
};
