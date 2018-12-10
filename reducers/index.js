import {ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, ADD_PROFILE_INFO, EDIT_PROFILE_INFO} from "../constants/action-types";
import {insertNewUser,editUser, deleteUser, insertNewProfileInfo, editProfileInfo} from "../database/schema";


const rootReducer = (state, action) => {
    switch (action.type) {
        case
        ADD_CONTACT:
            insertNewUser(action.payload).then(()=>
                {alert('User added successfully')}
            ).catch((error)=>{
                alert(`Error occured while adding: ${error}`);
            });
        return {...state,users:action.payload};
            break;
        case
        EDIT_CONTACT:
            editUser(action.payload).then(()=>{
                alert('User edited successfully');
            }).catch((error)=>{
                alert(`Error occured while updating: ${error}`);
            });
        return {...state,users:action.payload};
        break;
        case
        DELETE_CONTACT:
            deleteUser(action.payload).then(()=>{
                alert('Deleted contact successfully');
            }).catch((error)=>{
            alert(`Error occured while updating: ${error}`);
        });
        return {...state,users:action.payload};
        break;
        case
        ADD_PROFILE_INFO:
            action.payload.profileSubmitted= 'true';
            insertNewProfileInfo(action.payload).then(()=>
                {alert('Info added to db successfully')}
            ).catch((error)=>{
                alert(`Error occured while adding: ${error}`);
            });
        break;
        case
        EDIT_PROFILE_INFO:
            editProfileInfo(action.payload).then(()=> {
            alert('Info edited successfully')
        }).catch((error)=>{
                alert(`Error occured while adding: ${error}`);
            });
        break;
        default:
            return state;
    }
};

export default rootReducer;