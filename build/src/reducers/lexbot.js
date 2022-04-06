// import types
import {
    INPUT_SUCESS, 
    INPUT_FAILURE,
    MESSAGE_FAIL,
    MESSAGE_SUCCESS,
    SESSION_FAIL,
    SESSION_SUCCESS,
    SESSION_ACTIVE,
    MODAL_RESPONSE_ACTIVE,
    MODAL_RESPONSE_INACTIVE
} from "../actions/types";

// import Global Properties
import GlobalProperties from "../properties/GlobalProperties";

// Initial state
const initialState = {
    messages : [],
    modalData: {}
}


// Switch statement
const lexMessagesActions =  (state = initialState, action ) => {
    const {type, payload} = action;
    let { messages, modalData} = state;
    let marsha = window.propertyDetails.propertyMarshaCode;

    switch(type) {
        case INPUT_SUCESS : 
            messages = [...messages, {message: payload, type: "user"}];
            localStorage[`messages_${marsha}`] = JSON.stringify(messages);
            return {
                ...state,
                messages
            };
        case INPUT_FAILURE : 
            return {
                ...state
            };
        case SESSION_SUCCESS: 
            marsha = payload["marsha_code"];
            localStorage.setItem(`session_id_${marsha}`, payload["session_id"]);
            localStorage.setItem(`messages_${marsha}`, JSON.stringify(messages));
            return {
                ...state
            };
        case SESSION_FAIL: 
            return {
                ...state
            };
        case SESSION_ACTIVE: 
            console.log(payload) ;
            messages = [...messages, ...payload['messages']]
            return {
                ...state,
                messages
            };
        case MESSAGE_SUCCESS:
            messages = [...messages, {
                message: payload,
                type: "bot"
            }]
            localStorage[`messages_${marsha}`] = JSON.stringify(messages);
            return {
                ...state,
                messages
            };
        case MESSAGE_FAIL:
            return {
                ...state
            };
        case MODAL_RESPONSE_ACTIVE: 
            modalData = payload;
            console.log({
                ...state,
                modalData
            })
            return {
                ...state,
                modalData
            };
        case MODAL_RESPONSE_INACTIVE: 
            modalData = {}
            return {
                ...state,
                modalData
            }
        default: 
            return {
                ...state
            }
    }
};

export default lexMessagesActions