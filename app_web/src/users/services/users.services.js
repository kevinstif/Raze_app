import http from '@/core/http-common'

class  UsersService{
    endpoint='http://localhost:3000/api/v1/users';
    getById(id){
        return http.get( `${this.endpoint}/${id}`);
    }
    getAll(){
        return http.get(this.endPoint);
    }
    create(data){
        return http.post(this.endpoint,data);
    }
    update(id,data){
        return http.put(`${this.endpoint}/${id}`,data);
    }
    delete(id){
        return http.delete(`${this.endpoint}/${id}`)
    }
    findBy(email){
        return http.get(`${this.endpoint}?email=${email}`);
    }
}
export default new UsersService();
