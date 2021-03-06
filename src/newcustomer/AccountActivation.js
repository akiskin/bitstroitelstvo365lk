import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'url-search-params-polyfill';

import Wrapper from '../common/SingleColumnWrapper.js'

var axios = require('axios');


const ActivationForm = (props) => 
<div className="card">
    <div className="header">
        <h4 className="title text-center">Активация учетной записи</h4>
    </div>
    <div className="content">
        <form onSubmit={props.onSubmit}>

            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Активационный код</label>
                        <input type="text" className="form-control" required onChange={props.onCodeChange}  value={props.code} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    {props.children}
                </div>
            </div>
        </form>
    </div>
</div>

const ActivationInProgress = (props) => 
<div className="content">
    <div className="text-center"><i className="fa fa-refresh fa-spin fa-3x fa-fw"></i></div>
</div>

const ActivationSuccessful = (props) => 
<div className="content">
    <p className="text-center text-success">
        <strong><i className="fa fa-check" aria-hidden="true"></i> Активация прошла успешно</strong>
        <br />
        <small>Теперь можно входить в личный кабинет с ранее введенными логином и паролем</small>
    </p>
    <p className="text-center">
        <Link to="/login">
            <button className="btn btn-success btn-fill">Войти в кабинет</button>
        </Link>
    </p>
</div>

const ActivationError = (props) => 
<div className="content">
    <p className="text-center text-danger">
        Произошла ошибка: {props.errorText}
    </p>
    <p>
        Чтобы разобраться с ошибкой пришлите активационный код на почту <a href="mailto:support@bit-stroitelstvo.ru">support@bit-stroitelstvo.ru</a> с адреса, который был указан при регистрации.
    </p>
</div>

class AccountActivation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            inProgress: false,
            success: false,
            error: false,
            errorText: "Неверный код активации"
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const code = params.get('code');

        if (code != null) { 
            this.setState({code: code}, () =>  this.activate() );           
        }
    }


    render() {
        return (
            <Wrapper>
                <ActivationForm onSubmit={this.onSubmit}
                                onCodeChange={this.onCodeChange}
                                code={this.state.code}>
                    {(this.state.inProgress || this.state.success) ? null : <div className="text-center"><button type="submit" className="btn btn-success btn-fill" disabled={this.state.inProgress}>Завершить регистрацию</button></div>}
                    {this.state.inProgress ? <ActivationInProgress /> : null}
                    {this.state.success ? <ActivationSuccessful /> : null}
                    {this.state.error ? <ActivationError errorText={this.state.errorText} /> : null}
                </ActivationForm>
            </Wrapper>);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.activate();
    }

    onCodeChange = (e) => { this.setState({code: e.target.value}); }

    activate() {

        this.setState({inProgress: true});

        axios.get(this.props.basePublicURL + '/account/activation',
        {          
            params: {
                code: this.state.code
            },
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
                'Pragma': 'no-cache',
                'Expires': '-1'
            }
        }
        ).then((response) => {
            this.setState({
                inProgress: false,
                success: true,
                error: false
            });
        })
        .catch((error) => {
            this.setState({
                inProgress: false,
                success: false,
                error: true,
                errorText: error.response === undefined ? "ошибка соединения" : error.response.data
            });
        });        
    }    
}

const mapStateToProps = (state) => {
    return {
        basePublicURL: state.basePublicURL,
    };
}

export default connect(mapStateToProps)(AccountActivation);
