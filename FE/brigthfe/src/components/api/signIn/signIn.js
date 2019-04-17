import axios from 'axios'

export class SignInAPI {

    postSignIn(firstName = firstName, lastName = lastName, login = login, pass = pass) {
        return axios({
            method: 'post',
            url: 'http://localhost:3003/user',
            data: {
                first_name: firstName,
                last_name: lastName,
                login: login,
                pass: pass,
                roleId: 2
            }
            , headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
    }
}

export default SignInAPI;