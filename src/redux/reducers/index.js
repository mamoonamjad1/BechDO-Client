import { combineReducers } from 'redux'
import authReducer from './authReducer'
import currentPriceReducer from './currentPriceReducer'
import notificationReducer from './notificationReducer'
import cartReducer from './cartReducer'
import earningReducer from './earningReducer'
import orderReducer from './orderReducer'

const rootReducers = combineReducers({
    authReducer,
    currentPriceReducer,
    notificationReducer,
    cartReducer,
    earningReducer,
    orderReducer,

})

export default rootReducers
