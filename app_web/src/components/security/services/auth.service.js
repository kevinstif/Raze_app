import axios from 'axios';
const API_URL = 'https://localhost:5001/api/v1/users/auth/';
class AuthService {
    login(user) {
        return axios.post(API_URL + "sign-in", {
            email: user.email,
            password: user.password
        })
            .then(response => {
                if (response.data.token) {
                    console.log("user:" + response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        var data = {
            name: user.name,
            imgProfile: user.imgProfile,
            age: user.age,
            email: user.email,
            userType: user.userType,
            username: user.username,
            password: user.password,
            premium: user.premium,
            interestId: user.interestId,
            professionId: user.professionId
        }

        return axios.post(API_URL + 'sign-up', data);
    }
}
export default new AuthService();