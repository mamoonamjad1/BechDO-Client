import { CURRENTPRICE } from '../Constants'
const initialState = {
    currentPrice:''
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CURRENTPRICE:
            return {
                ...state,
                currentPrice:payload.currentPrice
            }
        default:
            return state
    }
}
export default authReducer
