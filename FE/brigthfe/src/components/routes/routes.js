import React, { Component } from 'react';
import Login from '../User/Login';
import News from '../news/allNews/news'
import NewsRoute from '../news/newsRouts'
import NewsAPI from '../api/news/newsApi'

class Routes extends Component {
    state = {
        authentication: false,
        route: this.props.route,
        userData: 0,
        news: [],
        roleId: 0
    }


    authentication = (userAllowed, userId, roleId) => {
        this.setState({
            authentication: userAllowed,
            userData: userId,
            roleId: roleId
        })
        this.props.loggedUserFunc(userAllowed)
        this.getNews()
    }

    getNews = () => {
        const newsApi = new NewsAPI();
        newsApi.getNews(this.state.roleId)
            .then((res) => {
                console.log(res)
                this.setState({
                    news: res.data
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state)
        return (
            <div>

                {!this.state.authentication ?
                    <Login getAuthorized={(allowedStatus, userId, roleId) => this.authentication(allowedStatus, userId, roleId)} />
                    :
                    this.props.route == 1 ?
                        <NewsRoute allNews={this.state.news} /> :
                        'dasd'
                }
            </div>


        );
    }
}

export default Routes;