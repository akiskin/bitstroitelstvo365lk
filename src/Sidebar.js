import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class NavLink extends Link {
    render() {
        let isActive = this.context.router.route.location.pathname === this.props.to;
        let className = isActive ? 'active' : '';

        return(
            <li className={className}>
                <Link {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
    return (
        <div className="sidebar" data-color="purple">
            <div className="sidebar-wrapper">
                <div className="logo">
                    <a href="http://alexanderkiskin.pro" className="simple-text">
                        БИТ.СТРОИТЕЛЬСТВО 365
                    </a>
                </div>

                <ul className="nav">

                    <NavLink to="/">
                        <i className="pe-7s-home"></i>
                        <p>Приложения</p>
                    </NavLink>

                    <NavLink to="/tariffs">
                        <i className="pe-7s-edit"></i>
                        <p>Настройки тарифов</p>
                    </NavLink>

                    <NavLink to="/users">
                        <i className="pe-7s-users"></i>
                        <p>Пользователи</p>
                    </NavLink>

                    <NavLink to="/profile">
                        <i className="pe-7s-id"></i>
                        <p>Реквизиты компании</p>
                    </NavLink>
                    
                    <NavLink to="/finance">
                        <i className="pe-7s-cash"></i>
                        <p>Финансы</p>
                    </NavLink>

                    <li onClick={this.handleLogout}>
                        <Link to="/login">
                            <i className="fa fa-power-off"></i>
                            <p>Выход</p>
                        </Link>
                    </li>

                    <li className="active-pro">
                        <p>По вопросам обращайтесь:<br />
                        <i className="fa fa-angle-right" aria-hidden="true"></i> support@bit-stroitelstvo.ru<br />
                        <i className="fa fa-angle-right" aria-hidden="true"></i> по телефону +7 (812) 677 02 77</p>
                    </li>

                </ul>
            </div>
        </div>

    );
    }

    handleLogout() {
        this.props.dispatch({
            type: "LOGOUT"
        });
    }

}

export default withRouter(connect()(Sidebar));
