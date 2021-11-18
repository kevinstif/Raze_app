import http from '../../core/http-common'
import axios from "axios";

class CommentsService{
    endPoint='/comments';

    getAll(id){
        return http.get(`/posts/${id}${this.endPoint}`);
    }
    create(createPostDto){
        return axios.post(`https://localhost:5001/api/v1/comments`, createPostDto);
    }
}

export default new CommentsService();
