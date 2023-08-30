import { CART } from "../Constants";

const initialState={
    count:'',
    price:'',
    name:'',
    quantity:''
}

const cartReducer = (state= initialState,action)=>{
    const { type, payload } = action
    switch(type){
        case CART:
            return {
                ...state,
                count:payload.count,
                price:payload.price,
                name:payload.name,
                quantity:payload.quantity
            }
            default:
                return state
    }
}
export default cartReducer