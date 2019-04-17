import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './SigIn.css'

import SignInApi from '../api/signIn/signIn';

class SignIn extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        login: '',
        pass: ''
    };

    handleLogin = () => {

        const signInApi = new SignInApi();
        signInApi.postSignIn(this.state.firstName, this.state.lastName, this.state.login, this.state.pass)
            .then(res => {
                console.log(res.data)
                this.props.goToRegisterFunc(false)
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
                        label="Fisrt Name"
                        value={this.state.firstName}
                        onChange={this.handleChange('firstName')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleChange('lastName')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Login"
                        value={this.state.login}
                        onChange={this.handleChange('login')}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Pass"
                        value={this.state.pass}
                        onChange={this.handleChange('pass')}
                        margin="normal"
                    />
                  
                    <Button onClick={this.handleLogin} color="secondary" variant="contained" className="button">
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

export default SignIn;