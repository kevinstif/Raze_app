import http from '../../core/http-common'
import axios from "axios";
import authHeader from "../../security/services/auth-header";

class TagsServices{
    endPoint='/tags';

    getAll(){
        return http.get(this.endPoint,{ headers: authHeader()});
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`,{ headers: authHeader()});
    }

    create(createTagDto){
        return axios.post(`https://razeapp-v1.azurewebsites.net/api/v1${this.endPoint}`, createTagDto,{ headers: authHeader()});
    }

    update(id,updateTagDto){
        return axios.put(`https://razeapp-v1.azurewebsites.net/api/v1${this.endPoint}/${id}`, updateTagDto,{ headers: authHeader()});
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`,{ headers: authHeader()})
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`,{ headers: authHeader()});
    }
}

export default new TagsServices();
