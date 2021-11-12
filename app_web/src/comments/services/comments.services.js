import http from '../../core/http-common'
import axios from "axios";

class CommentsService{
    endPoint='/comments';

    getAll(id){
        return http.get(`/posts/${id}${this.endPoint}`);
    }
    create(createPostDto, id){
        return axios.post(`http://localhost:3000/api/v1/posts/${id}${this.endPoint}`, createPostDto);
    }
}

export default new CommentsService();
