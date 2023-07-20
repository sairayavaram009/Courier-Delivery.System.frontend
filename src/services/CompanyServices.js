import apiClient from "./services";

export default {
  getCompanies(queryParams) {
    return apiClient.get("companies", {
      params: queryParams,
    });
  },
  getCompany(id) {
    return apiClient.get("companies/" + id);
  },
  addCompany(company) {
    return apiClient.post("companies", company);
  },
  updateCompany(company) {
    return apiClient.put("companies/" + company.id, company);
  },
  deleteCompany(companyId) {
    return apiClient.delete("companies/" + companyId);
  }
};