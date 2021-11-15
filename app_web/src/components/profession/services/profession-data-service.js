import http from "../../../core/http-common";
import axios from "axios";

class professionDataService {
    endPoint='/professions';
    getAll() {
        return http.get(this.endPoint);
    }

    get(id) {
        return http.get(`${this.endPoint}/${id}`);
    }

    findByName(name) {
        return http.get(`${this.endPoint}?name=${name}`);
    }

    create(data) {
        return axios.post(`http://localhost:3000/api/v1${this.endPoint}`, data);
    }

    update(id, data) {
        return axios.put(`http://localhost:3000/api/v1${this.endPoint}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${this.endPoint}/${id}`)
    }
}

export default new professionDataService();