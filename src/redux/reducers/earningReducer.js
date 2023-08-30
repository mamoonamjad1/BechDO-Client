import { EARNING } from "../Constants";

const initialState ={
     earnings: ''
}

const earningReducer = (state=initialState,actioon)=>{
    const{ type,payload } = actioon
    switch(type){
        case EARNING:
            return{
                ...state,
                earnings: payload.earnings
            }
            default:
                return state
    }
    
}
export default earningReducer