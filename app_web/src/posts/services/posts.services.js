import http from '../../core/http-common'
import axios from "axios";

class PostsService{
    endPoint='/posts';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createPostDto){
        return axios.post(`http://localhost:3000/api/v1${this.endPoint}`, createPostDto);
    }

    update(id,updatePostDto){
        return http.put(`${this.endPoint}/${id}`, updatePostDto);
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`)
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }
}

export default new PostsService();