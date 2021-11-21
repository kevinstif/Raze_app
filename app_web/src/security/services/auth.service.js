import axios from 'axios';
const API_URL = 'https://localhost:5001/api/v1/users/auth/';
class AuthService {
    login(user) {
        return axios.post(API_URL + 'sign-in', user)
            .then(response => {
                if (response.data.token) {
                    console.log("user:" + response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'sign-up', user);
    }
}
export default new AuthService();
