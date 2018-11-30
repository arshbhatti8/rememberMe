import {ADD_CONTACT} from "../constants/action-types";

const initialState = {
    isLoggedIn: false,
    user: {
        firstName: "First Name",
        lastName: "Last Name",
        phoneNumber: "Phone Number",
        emailAddress: "Email Address",
        company: "Company",
    }

};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case
        ADD_CONTACT:
            return {...state, user: action.payload};
            break;
        default:
            return state;
    }
};

export default rootReducer;