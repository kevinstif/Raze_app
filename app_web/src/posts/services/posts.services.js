import http from '../../core/http-common'
import axios from "axios";

class PostsService{
    endPoint='/posts';

    getAll(){
        return http.get(this.endPoint);
    }
    getAllByUserId(userId){
        return http.get(`https://localhost:5001/api/v1/user/${userId}/posts`);
    }
    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }
    create(createPostDto){
        return axios.post(`https://localhost:5001/api/v1${this.endPoint}`, createPostDto);
    }

    update(id,updatePostDto){
        return axios.put(`https://localhost:5001/api/v1${this.endPoint}/${id}`, updatePostDto);
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`)
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }
}

export default new PostsService();
