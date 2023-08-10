import { combineReducers } from 'redux'
import authReducer from './authReducer'
import currentPriceReducer from './currentPriceReducer'

const rootReducers = combineReducers({
    authReducer,
    currentPriceReducer,

})

export default rootReducers
