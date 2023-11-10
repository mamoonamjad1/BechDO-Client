import { ORDERDETAILS } from "../Constants";
const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    postal: ''
};

const orderDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FIRST_NAME':
            return {
                ...state,
                firstName: action.payload
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                lastName: action.payload
            };
        case 'SET_ADDRESS':
            return {
                ...state,
                address: action.payload
            };
        case 'SET_PHONE':
            return {
                ...state,
                phone: action.payload
            };
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        case 'SET_CITY':
            return {
                ...state,
                city: action.payload
            };
        case 'SET_POSTAL':
            return {
                ...state,
                postal: action.payload
            };
        default:
            return state;
    }
};

export default orderDetailReducer;
