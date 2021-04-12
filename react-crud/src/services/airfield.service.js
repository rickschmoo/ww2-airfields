import http from "../http-common";

class AirfieldDataService {
  getAll() {
    return http.get("/airfields");
  }

  get(id) {
    return http.get(`/airfields/${id}`);
  }

  create(data) {
    return http.post("/airfields", data);
  }

  update(id, data) {
    return http.put(`/airfields/${id}`, data);
  }

  delete(id) {
    return http.delete(`/airfields/${id}`);
  }

  deleteAll() {
    return http.delete(`/airfields`);
  }

  findByName(name) {
    return http.get(`/airfields?name=${name}`);
  }
}

export default new AirfieldDataService();
