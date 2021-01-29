import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import home from '../../pages/Home';

class Rout extends Component{
    render(){
        return(
          <Router>
            <div>
          <Route path="/" exact component={home}/> 
            </div>
          </Router>
        );
    }
}

export default Rout;