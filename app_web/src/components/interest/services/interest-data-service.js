import http from "../../../core/http-common";
import axios from "axios";

class interestDataService {
    I_endPoint='/interests';
    getAll() {
        return http.get(this.I_endPoint);
    }

    get(id) {
        return http.get(`${this.I_endPoint}/${id}`);
    }

    findByTitle(title) {
        return http.get(`${this.I_endPoint}?title=${title}`);
    }

    create(data) {
        return axios.post(`https://localhost:5001/api/v1${this.I_endPoint}`, data);
    }

    update(id, data) {
        return axios.put(`https://localhost:5001/api/v1${this.I_endPoint}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${this.I_endPoint}/${id}`)
    }
}

export default new interestDataService();
