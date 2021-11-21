import axios from "axios";
import authHeader from "../../security/services/auth-header";

class  UsersService{
    endpoint='https://localhost:5001/api/v1/users';
    getById(id){
        return axios.get( `${this.endpoint}/${id}`,{ headers: authHeader()});
    }
    getAll(){
        return axios.get(this.endpoint,{ headers: authHeader()});
    }
    create(data){
        return axios.post(this.endpoint,data,{ headers: authHeader()});
    }
    update(id,updateUserDto){
        return axios.put(`${this.endpoint}/${id}`,updateUserDto,{ headers: authHeader()});
    }
    delete(id){
        return axios.delete(`${this.endpoint}/${id}`,{ headers: authHeader()})
    }
    findBy(email){
        return axios.get(`${this.endpoint}?email=${email}`,{ headers: authHeader()});
    }
}
export default new UsersService();
