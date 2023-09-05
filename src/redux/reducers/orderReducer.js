import { ORDER } from '../Constants';

const initialState = {
  orderCount :0,
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("DMKDMKMKD",payload)
  switch (type) {
    case ORDER:
      return {
        ...state,
        orderCount:payload,
      };
    default:
      return state;
  }
};

export default orderReducer; 
