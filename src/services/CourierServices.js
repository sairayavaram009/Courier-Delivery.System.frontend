import apiClient from "./services";

export default {
  getCouriers(queryParams) {
    return apiClient.get("couriers", {
      params: queryParams,
    });
  },
  getCourier(id) {
    return apiClient.get("couriers/" + id);
  },
  addCourier(courier) {
    return apiClient.post("couriers", courier);
  },
  updateCourier(courier) {
    return apiClient.put("couriers/" + courier.id, courier);
  },
  deleteCourier(courierId) {
    return apiClient.delete("couriers/" + courierId);
  }
};