import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import { Provider, connect } from 'react-redux'
import store, {loadPlants} from './store'



const App = connect(
  (state)=> {
   return state;
  },
 (dispatch) => {
    return { 
    bootstrap: async()=> {
      const plants = (await axios.get('/api/plants')).data;
      dispatch(loadPlants(plants))
    } 
   }
 } 
)(class App extends Component {  
  componentDidMount (){
      this.props.bootstrap();
  }
  render (){
    const { plants } = this.props;
    return (
      <ul>
        {
          plants.map(plant => {
              return (
                  <li key={plant.id}>
                      {plant.name}
                  </li>
              );
          })  
        }  
      </ul>
    )
  }
})


render(<Provider store={store}><App /></Provider>, document.querySelector('#root'))