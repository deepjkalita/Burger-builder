import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient=(name)=>{
  return{
    type:actionTypes.ADD_INGREDIENT,
    ingredientName:name
  }
}

export const removeIngredient=(name)=>{
  return{
    type:actionTypes.REMOVE_INGREDIENT,
    ingredientName:name
  }
}

export const fetchIngredientFailed=()=>{
  return{
    type:actionTypes.FETCH_INGREDIENTS_FAILED,

  }
}

export const setIngredients=(ingredients)=>{
  return{
    type:actionTypes.SET_INGREDIENT,
    ingredients:ingredients
  };
}



export const initIngredients=()=>{
  return dispatch=>{
    axios.get('https://react-my-app-9b8fa.firebaseio.com/ingredients.json')
      .then(res=>{
        dispatch(setIngredients(res.data));
      })
      .catch(error=>{
            dispatch(fetchIngredientFailed());
      });
  };
}
