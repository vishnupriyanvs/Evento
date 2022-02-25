import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Paths from './routes';
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";



class App extends React.Component{
    render(){
        return(
            <div>
                <Paths />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))