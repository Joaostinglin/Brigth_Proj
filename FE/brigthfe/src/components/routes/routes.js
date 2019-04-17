import React, { Component } from 'react';
import Login from '../User/Login';
import News from '../news/allNews/news';
import NewsRoute from '../news/newsRouts';
import NewsAPI from '../api/news/newsApi';
import SignIn from '../signIn/sigIn';

class Routes extends Component {
    state = {
        authentication: false,
        route: this.props.route,
        userData: 0,
        news: [],
        roleId: 0,
        registerPage: false
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

    goToRegister = (goToRegisterParam) => {
        this.setState({
            registerPage: goToRegisterParam
        })
    }


    render() {
        console.log(this.state)
        return (
            <div>

                {!this.state.authentication && !this.state.registerPage ?
                    <Login
                        getAuthorized={(allowedStatus, userId, roleId) => this.authentication(allowedStatus, userId, roleId)}
                        goToRegisterFunc={(goToRegisterParam) => this.goToRegister(goToRegisterParam)}
                    />
                    :
                    this.state.registerPage ?
                        <SignIn goToRegisterFunc={(goToRegisterParam) => this.goToRegister(goToRegisterParam)} />
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