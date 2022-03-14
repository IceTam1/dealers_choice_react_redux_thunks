import { createStore} from 'redux'
const LOAD_PLANTS = 'LOAD_PLANTS'

const store = createStore(( state = { plants: []}, action) => {
    if(action.type === LOAD_PLANTS){
        state = {...state, plants: action.plants}
    }
    return state;
 })

const loadPlants = (plants) => {
  return {
    type: LOAD_PLANTS, 
    plants  
  }
}
 export default store;
 export { loadPlants };