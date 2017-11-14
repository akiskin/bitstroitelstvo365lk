import React, {Component} from 'react';

const Container = (props) =>
<div className="main-panel">
    <div className="content">
        <div className="container-fluid">
            <div className="row">
                {props.children}
            </div>
        </div>
    </div>
</div>


const DataScreen = (props) => 
<div className="card">
    <div className="header">
        <h1>Перенос данных в сервис</h1>
    </div>
    <div className="content">
        <p>Укажите используемую сейчас конфигурацию:</p>
        {props.children}
    </div>
</div>

const DataBuh3 = () =>
<div>
    <p>1. Выгрузите данные из базы через "Администрирование → Сервис → Выгрузить данные для перехода в сервис" (<a href="https://bitstroitelstvo.atlassian.net/wiki/spaces/365KB/pages/196683" target="_blank" rel="noopener noreferrer">инструкция</a>)</p>
    <p>2. Пришлите полученный ZIP файл на почту SUPPORT@BIT-STROITELSTVO.RU с того адреса, который был указан при регистрации.</p>
    <p>3. Процесс загрузки (с учетом возможного обновления конфигурации) может занять до суток.</p>
</div>

const DataBuh2 = () =>
<div>
    <p><strong>Перенос возможен только из редакции 3.0</strong></p>
    <p>Вы можете самостоятельно произвести обновление до актуальной версии редакции 3.0, после чего передать выгрузку нам.</p>
</div>

const DataOther = () =>
<p><strong>Такой перенос не поддерживается в автоматическом режиме</strong></p>

class LoadMyData extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            config: "buh3"
        };
      }
    
    render() {
        return(
            <Container>
                <DataScreen>
                    <div className="row">
                        <div className="col-md-4">
                            <select className="form-control" onChange={this.onChange} defaultValue="buh3">
                                <option value="buh3">Бухгалтерия, ред. 3.0</option>
                                <option value="buh2">Бухгалтерия, ред. 2.0</option>
                                <option value="other">Другая</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <p></p>
                            {this.state.config === "buh3" && <DataBuh3 />}
                            {this.state.config === "buh2" && <DataBuh2 />}
                            {this.state.config === "other" && <DataOther />}
                        </div>
                    </div>

                </DataScreen>
            </Container>
        );
    }

    onChange = (e) => {this.setState({config: e.target.value})}

}

export default LoadMyData