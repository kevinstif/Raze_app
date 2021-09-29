import http from '../../core/http-common'

class PostsService{
    endPoint='/posts';

    getAll(){
        return http.get(this.endPoint);
    }

    getById(id){
        return http.get(`${this.endPoint}/${id}`);
    }

    create(createTutorialDto){
        return http.post(this.endPoint, createTutorialDto);
    }

    update(id,updateTutorialDto){
        return http.put(`${this.endPoint}/${id}`, updateTutorialDto);
    }

    delete(id){
        return http.delete(`${this.endPoint}/${id}`)
    }

    findByTitle(title){
        return http.get(`${this.endPoint}?title=${title}`);
    }
}

export default new PostsService();