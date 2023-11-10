import { ORDERDETAILS } from "../Constants";

export const setFirstName = (firstName) => {
    return {
        type: 'SET_FIRST_NAME',
        payload: firstName
    };
};

export const setLastName = (lastName) => {
    return {
        type: 'SET_LAST_NAME',
        payload: lastName
    };
};

export const setAddress = (address) => {
    return {
        type: 'SET_ADDRESS',
        payload: address
    };
};

export const setPhone = (phone) => {
    return {
        type: 'SET_PHONE',
        payload: phone
    };
};

export const setEmail = (email) => {
    return {
        type: 'SET_EMAIL',
        payload: email
    };
};

export const setCity = (city) => {
    return {
        type: 'SET_CITY',
        payload: city
    };
};

export const setPostal = (postal) => {
    return {
        type: 'SET_POSTAL',
        payload: postal
    };
};
