import axios from 'axios'

export class LoginAPI {

    getUser() {
        return axios.get('http://localhost:3003/user');
    }

    postLogin(userLogin = userLogin, userPass = userPass) {

        return axios({
            method: 'post',
            url: 'http://localhost:3003/login',
            data: {
                login: userLogin,
                pass: userPass
            }
            , headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
    }
    F
}

export default LoginAPI;