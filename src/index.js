import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux'
import store, { loadPlants, loadPlantthings, setView } from './store';
import Nav from './Nav'
import Plants from './Plants'
import Plantthings from './Plantstore'



const App = connect(
  (state)=> {
   return state;
  },
 (dispatch) => {
    return { 
    bootstrap: async ()=> {
      dispatch(loadPlants());
      dispatch(loadPlantthings());
    },
    setView: function(view){
      dispatch(setView(view))
    } 
   }
 } 
)(class App extends Component {  
  componentDidMount (){
      this.props.bootstrap();
      window.addEventListener('hashchange', ()=> {
        this.props.setView(window.location.hash.slice(1));
      });
      this.props.setView(window.location.hash.slice(1)); 
  }
  render (){
    const { plants, view } = this.props;
    return (
      <div>
        <h1> My Plant Directory
        <Nav />
        </h1>
        
        { view === 'plants' && <Plants /> }
        { view === 'plantthings' && <Plantthings /> }
      
      </div>
  
    );
  }
})


render(<Provider store={store}><App /></Provider>, document.querySelector('#root'))