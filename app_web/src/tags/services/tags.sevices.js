import http from '../../core/http-common'
import axios from "axios";

class TagsServices{
    endPoint='/tags';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createTagDto){
        return axios.post(`https://localhost:5001/api/v1${this.endPoint}`, createTagDto);
    }

    update(id,updateTagDto){
        return axios.put(`https://localhost:5001/api/v1${this.endPoint}/${id}`, updateTagDto);
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`)
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }
}

export default new TagsServices();
