import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Menu from '../commom/menu'

import './commom.css'



class Header extends React.Component {
    state = {
        section: ''
    }

    selectSection = (sectionSelected) => {
        this.setState({
            section: sectionSelected
        })
        this.props.selectedSectionAppFunc(sectionSelected)

    }

    render() {
        return (
            <AppBar position="static" color={this.props.color}>
                <div className="header-container">

                    {this.props.showIcon &&

                        <div>
                            <Menu selectSectionFunc={(sectionSelected) => this.selectSection(sectionSelected)} />
                        </div>
                    }
                    <div className="header">
                        <p className="title"> Portal de Notícias</p>
                    </div>

                </div>
            </AppBar>
        )
    }
}


export default Header;