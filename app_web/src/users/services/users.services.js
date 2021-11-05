import http from '../../core/http-common'
//import axios from "axios";

class UsersService{
    endPoint='/posts';

    getAll(id){
        return http.get(`${this.endPoint}/${id}/comments`);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }
}

export default new UsersService();