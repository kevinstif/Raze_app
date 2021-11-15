
import axios from "axios";

class  UsersService{
    endpoint='http://localhost:3000/api/v1/users';
    getById(id){
        return axios.get( `${this.endpoint}/${id}`);
    }
    getAll(){
        return axios.get(this.endPoint);
    }
    create(data){
        return axios.post(this.endpoint,data);
    }
    update(id,data){
        return axios.put(`${this.endpoint}/${id}`,data);
    }
    delete(id){
        return axios.delete(`${this.endpoint}/${id}`)
    }
    findBy(email){
        return axios.get(`${this.endpoint}?email=${email}`);
    }
}
export default new UsersService();
