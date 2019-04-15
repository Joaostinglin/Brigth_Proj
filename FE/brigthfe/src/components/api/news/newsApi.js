import axios from 'axios'

export class NewsAPI {

    getNews(roleId = roleId) {
        let accessToken = localStorage.getItem('jwt');
        let fullToker = 'Bearer ' + accessToken
        return axios({
            method: 'post',
            url: 'http://localhost:3003/news/published',
            data: {
                role: roleId
            },
            headers: {
                'Authorization': fullToker,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}

export default NewsAPI;