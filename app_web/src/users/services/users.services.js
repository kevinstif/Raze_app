import http from '../../core/http-common'
import axios from "axios";

class  UsersService{
    endpoint='http://localhost:3000/api/v1/users';
    getById(id){
        return http.get( `${this.endpoint}/${id}`);
    }
    getAll(){
        return http.get(this.endpoint);
    }
    create(data){
        return http.post(this.endpoint,data);
    }
    update(id,updateUserDto){
        console.log(updateUserDto);
        return axios.put(`http://localhost:3000/api/v1/users/${id}`,updateUserDto);
    }
    delete(id){
        return http.delete(`${this.endpoint}/${id}`)
    }
    findBy(email){
        return http.get(`${this.endpoint}?email=${email}`);
    }
}
export default new UsersService();
