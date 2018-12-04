import {ADD_CONTACT} from "../constants/action-types";
import {insertNewUser} from "../database/schema";


const rootReducer = (state, action) => {
    switch (action.type) {
        case
        ADD_CONTACT:
            insertNewUser(action.payload).then().catch((error)=>{
                alert('Error occured while adding: '+error);
            });
        return {...state,users:action.payload};
            break;
        default:
            return state;
    }
};

export default rootReducer;