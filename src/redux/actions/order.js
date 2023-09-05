import { ORDER } from '../Constants'


export const SetOrderCount = (data) => {
    return {
      type: ORDER,
      payload: data,
    };
  };
  
