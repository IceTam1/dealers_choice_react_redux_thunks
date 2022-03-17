import React from 'react';
import { connect } from "react-redux";
import store, { createPlants } from './store'
import axios from 'axios'

const deletePlant = async (plant) => {
  await axios.delete(`/api/plants/${plant.id}`);
  store.dispatch({ type: "DELETE_PLANT", plant });
}


const Plants = ({ plants, createPlants }) => {
return (
  <div className='wholelist'>
    <button className='add' onClick={()=> createPlants(Math.random()) }> Add Plant </button>
     <ul>
        {
          plants.map(plant => {
              return (
                <div>
                  <li className='plantrec' key={plant.id}>
                      {plant.name}
                      <button className='delete' onClick={() => deletePlant(plant)}>I have this plant already!</button>
                  </li>
                </div>
                );
            })  
          }  
      </ul>
  </div>
 )
}

const mapDispatchToProps = (dispatch)=> {
  return {
    createPlants: (plants)=> {
      dispatch(createPlants(plants))
    }
  }
}




export default connect(state => state, mapDispatchToProps)(Plants)