import http from '../../core/http-common'
//import axios from "axios";

class UsersService{
    endPoint='/users';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }
}

export default new UsersService();