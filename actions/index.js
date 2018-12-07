import {ADD_CONTACT} from "../constants/action-types";
import {EDIT_CONTACT} from "../constants/action-types";
import {ADD_PROFILE_INFO} from "../constants/action-types";
import {EDIT_PROFILE_INFO} from "../constants/action-types";

export const addContact = contact => ({type:ADD_CONTACT,payload:contact});
export const editContact = contact => ({type:EDIT_CONTACT,payload:contact});
export const addProfileInfo = info => ({type:ADD_PROFILE_INFO,payload:info});
export const editProfileInfo = info => ({type:EDIT_PROFILE_INFO,payload:info});



