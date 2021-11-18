import axios from "axios";

class  UsersService{
    endpoint='https://localhost:5001/api/v1/users';
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
