import http from '../../core/http-common'
import axios from "axios";
import authHeader from "../../security/services/auth-header";

class PostsService{
    endPoint='/posts';

    getAll(){
        return http.get(this.endPoint,{ headers: authHeader()});
    }
    getAllByUserId(userId){
        return http.get(`https://localhost:5001/api/v1/user/${userId}/posts`,{ headers: authHeader()});
    }
    getById(id){
        return http.get(`${this.endPoint}/${id}`,{ headers: authHeader()});
    }
    create(createPostDto){
        return axios.post(`https://localhost:5001/api/v1${this.endPoint}`, createPostDto,{ headers: authHeader()});
    }

    update(id,updatePostDto){
        return axios.put(`https://localhost:5001/api/v1${this.endPoint}/${id}`, updatePostDto,{ headers: authHeader()});
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`,{ headers: authHeader()})
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`,{ headers: authHeader()});
    }
}

export default new PostsService();
