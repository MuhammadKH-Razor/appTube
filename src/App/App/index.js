import React, { Component } from 'react';
import storeRedux from '../../Containers/config/redux/store/storeRedux';
import { Provider } from 'react-redux';
// import Home from '../../Containers/pages/Home/formOngkir';
import Home from '../../Containers/Router/router/router';


class App extends Component{

  render(){
    return( 
      <div>
        <Provider store={storeRedux}>
          <Home/>
        </Provider>
      </div>
    );
  }
}

export default App;