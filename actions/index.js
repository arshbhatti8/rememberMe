import {ADD_CONTACT} from "../constants/action-types";
import {EDIT_CONTACT} from "../constants/action-types";

export const addContact = contact => ({type:ADD_CONTACT,payload:contact});
export const editContact = contact => ({type:EDIT_CONTACT,payload:contact});



