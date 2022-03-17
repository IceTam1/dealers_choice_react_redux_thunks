import { createStore, combineReducers, applyMiddleware } from 'redux'
const LOAD_PLANTS = 'LOAD_PLANTS'
const LOAD_PLANTTHINGS = 'LOAD_PLANTTHINGS'
const SET_VIEW = 'SET_VIEW';
const CREATE_PLANT = 'CREATE_PLANT'
const DELETE_PLANT = 'DELETE_PLANT'
import axios from 'axios';
import thunk from 'redux-thunk';


 const plantReducer = (state = [], action) => {
  if (action.type === LOAD_PLANTS){
    state = action.plants;
  }
  if (action.type === CREATE_PLANT){
    state = [...state, action.newplant];
  }
  if (action.type === DELETE_PLANT){
    state = state.filter(plant => plant.id !== action.plant.id);
  }
   return state;
 }

 const plantthingsReducer = (state = [], action) => {
  if (action.type === LOAD_PLANTTHINGS){
    state = action.plantthings;
  }
   return state;
 }

 const viewReducer = (state = [], action) => {
  if (action.type === SET_VIEW){
    state = action.view;
  }
   return state;
 }

 const reducer = combineReducers({
  plants: plantReducer,
  plantthings: plantthingsReducer,
  view: viewReducer
})

const store = createStore(reducer, applyMiddleware(thunk))


const _loadPlants = (plants) => {
  return {
    type: LOAD_PLANTS, 
    plants  
  }
}

const _loadPlantthings = (plantthings) => {
  return {
    type: LOAD_PLANTTHINGS, 
    plantthings  
  }
}

const loadPlantthings = () => {
  return async (dispatch) => {
    const plantthings = (await axios.get('/api/plantthings')).data;
      dispatch(_loadPlantthings(plantthings))
  }
}


const loadPlants = () => {
  return async (dispatch) => {
    const plants = (await axios.get('/api/plants')).data;
      dispatch(_loadPlants(plants))
  }
}

const setView = (view) => {
  return {
    type: SET_VIEW, 
    view 
  }
}

const _createPlants = (newplant) => {
  return {
    type: CREATE_PLANT, 
    newplant
  }
}

const createPlants = (plants) => {
  return async (dispatch) => {
    const newplant = (await axios.post('/api/plants', { plants })).data;
      dispatch(_createPlants(newplant))
  }
}

 export default store;
 export { loadPlants, loadPlantthings, setView, createPlants};