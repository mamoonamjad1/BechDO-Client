import { NOTIFICATIONS } from '../Constants';

const initialState = {
  notificationCount: 0,
};

const notificationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("DMKDMKMKD",payload)
  switch (type) {
    case NOTIFICATIONS:
      return {
        ...state,
        notificationCount: payload,
      };
    default:
      return state;
  }
};

export default notificationReducer; 
