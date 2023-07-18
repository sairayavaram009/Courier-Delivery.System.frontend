import apiClient from "./services";

export default {
  getDeliveryRequests(filter,userId) {
    console.log("filter",filter,userId)
    if(!filter)
    return apiClient.get("deliveryRequests");
    if(filter == "ordered")
        return apiClient.get("deliveryRequests/user/"+userId)
      else if(filter== "courier")
        return apiClient.get("deliveryRequests/courier/"+userId)
  return apiClient.get("deliveryRequests")
  },
  getDeliveryRequest(id) {
    return apiClient.get("deliveryRequests/" + id);
  },
  addDeliveryRequest(deliveryRequest) {
    return apiClient.post("deliveryRequests", deliveryRequest);
  },
  updateDeliveryRequest(deliveryRequest) {
    return apiClient.put("deliveryRequests/" + deliveryRequest.id, deliveryRequest);
  },
  deleteDeliveryRequest(deliveryRequestId) {
    return apiClient.delete("deliveryRequests/" + deliveryRequestId);
  },
  estimateCost(deliveryRequest) {
    return apiClient.post("deliveryRequests/estimateCost", deliveryRequest);
  },
};