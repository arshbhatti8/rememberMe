import {ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT} from "../constants/action-types";
import {insertNewUser,editUser, deleteUser} from "../database/schema";


const rootReducer = (state, action) => {
    switch (action.type) {
        case
        ADD_CONTACT:
            insertNewUser(action.payload).then().catch((error)=>{
                alert(`Error occured while adding: ${error}`);
            });
        return {...state,users:action.payload};
            break;
        case
        EDIT_CONTACT:
            editUser(action.payload).then().catch((error)=>{
                alert(`Error occured while updating: ${error}`);
            });
        return {...state,users:action.payload};
        break;
        case
        DELETE_CONTACT:
            deleteUser(action.payload).then().catch((error)=>{
            alert(`Error occured while updating: ${error}`);
        });
        return {...state,users:action.payload};
        break;
        default:
            return state;
    }
};

export default rootReducer;