import axios from "axios";

const API_BASE_URL = "http://your-api-url.com"; // Replace with your API base URL

export default {
  async trackDelivery(trackingNumber) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/track/${trackingNumber}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch tracking information. Please try again.");
    }
  },
};
