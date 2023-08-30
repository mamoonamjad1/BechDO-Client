import { USERDATA } from '../Constants'
const initialState = {
    userId: '',
    firstName:'',
    lastName:'',
    email:''
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USERDATA:
            return {
                ...state,
                userId:payload._id,
                firstName:payload.firstName,
                lastName:payload.lastName,
                email:payload.email
            }
        default:
            return state
    }
}
export default authReducer
