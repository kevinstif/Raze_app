import http from '../../core/http-common'
import axios from "axios";

class CommentsService{
    endPoint='/posts';

    getAll(id){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createPostDto){
        return axios.post(`http://localhost:3000/api/v1${this.endPoint}`, createPostDto);
    }
}

export default new CommentsService();