import React, { Component } from 'react';
import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Header from './components/commom/Header';
import Routes from './components/routes/routes'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#e91e63',
    },
  },
});


class App extends Component {
  state = {
    loggedStatus: false,
    section: '',
    sectionApp: null
  }

  showMenuIcon = (loggedStatus) => {
    this.setState({
      loggedStatus: loggedStatus
    })
  }

  showSection = (section) => {
    this.setState({
      section: section
    })
  }

  selectedSectionApp = (sectionSelected) => {
    this.setState({
      sectionApp: sectionSelected
    })
  }

  render() {
    console.log(this.state.sectionApp)
    return (
      <MuiThemeProvider theme={theme}>

        <Header color="primary" showIcon={this.state.loggedStatus}
          showIconFunc={(section) => this.showSection(section)}
          selectedSectionAppFunc={(sectionSelected) => this.selectedSectionApp(sectionSelected)}
        />

        <Routes loggedUserFunc={(loggedStatus) => this.showMenuIcon(loggedStatus)} route={this.state.sectionApp}  />
      </MuiThemeProvider>

    );
  }
}

export default App;
