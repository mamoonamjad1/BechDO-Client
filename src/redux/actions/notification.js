import { NOTIFICATIONS } from '../Constants'

// SetNotificationCount action
export const SetNotificationCount = (data) => {
    return {
      type: NOTIFICATIONS,
      payload: data,
    };
  };
  
