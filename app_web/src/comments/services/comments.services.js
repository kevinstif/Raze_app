import http from '../../core/http-common'
import axios from "axios";
import authHeader from "../../security/services/auth-header";

class CommentsService{
    endPoint='/comments';

    getAll(id){
        return http.get(`/posts/${id}${this.endPoint}`,{ headers: authHeader()});
    }
    create(createPostDto){
        return axios.post(`https://razeapp-v1.azurewebsites.net/api/v1/comments`, createPostDto,{ headers: authHeader()});
    }
}

export default new CommentsService();
