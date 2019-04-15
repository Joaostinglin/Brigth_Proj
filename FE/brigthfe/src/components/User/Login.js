import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Login.css'

import LoginAPI from '../api/login/loginApi'

class TextFields extends React.Component {
    state = {
        userName: '',
        userPass: ''
    };

    handleLogin = () => {

        const loginAPI = new LoginAPI();
        loginAPI.postLogin(this.state.userName, this.state.userPass)
            .then(res => {
                console.log(res.data)
                window.localStorage.setItem('jwt', res.data.token);
                this.props.getAuthorized(true, res.data.userId, res.data.roleId)
            })
            .catch(err => {
                console.log(err)
                localStorage.clear()
            })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {

        return (
            <div className="page-container">
                <form className="form-container">
                    <TextField
                        id="standard-name"
                        label="Login"
                        value={this.state.userName}
                        onChange={this.handleChange('userName')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Pass"
                        type="password"
                        value={this.state.userPass}
                        onChange={this.handleChange('userPass')}
                        margin="normal"
                    />
                    <Button onClick={this.handleLogin} color="secondary" variant="contained" className="button">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default TextFields;