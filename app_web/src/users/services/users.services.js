import http from '../../core/http-common'
import axios from "axios";

class  UsersService{
    endpoint='http://localhost:3000/users';
    getById(id){
        return axios.get( `${this.endpoint}/${id}`);
    }
    getAll(){
        return axios.get(this.endpoint);
    }
    create(data){
        return axios.post(this.endpoint,data);
    }
    update(id,updateUserDto){
        return axios.put(`${this.endpoint}/${id}`,updateUserDto);
    }
    delete(id){
        return axios.delete(`${this.endpoint}/${id}`)
    }
    findBy(email){
        return axios.get(`${this.endpoint}?email=${email}`);
    }
}
export default new UsersService();
