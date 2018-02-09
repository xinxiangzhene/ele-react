import { combineReducers } from 'redux'

const todoCart = (state = [], action) => {
  const { type, data} = action;
  switch (type){
  	case "ADD_CART":
  	   return [...state,data];
  		// break;
	  case "DEL_CART":
	   state.splice(data,1);
	   return state
      //break; 
   	default:
	   return state;
    	//break;
  }
}


var reducer = combineReducers({
  todoCart,
})
export default reducer;