import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Paths from './routes';



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