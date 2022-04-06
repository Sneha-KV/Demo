// import types
import AWS from 'aws-sdk';
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
} from "./types";
import store from "../store";

// import ID creator
import { v4 as uuid} from 'uuid';

import GlobalProperties from '../properties/GlobalProperties';



// function that handles users message
export const userMessage = (message, closeModal = false) => async (dispatch) => {
    if(closeModal) {
        dispatch({
            type: MODAL_RESPONSE_INACTIVE
        })
    } else {
        try {
            dispatch({
                type : INPUT_SUCESS,
                payload: message
            })
        } catch (err) {
            dispatch({
                type: INPUT_FAILURE
            });
        }
    }
}


// Sends the message to the bot - LEX connection etc
export const sendMessage = (message, sessionId = '', isModalMessage = false) => async (dispatch) => {

    try {
        // let session_id = "";
        var lexruntime = new AWS.LexRuntimeV2({apiVersion: '2020-08-07'});
        var params = {
            botId: 'UJNS4QLLJS',
            botAliasId: 'CCSSPDWXSF',
            localeId:'en_US',
            text: isModalMessage ? 'room details' : message,
            sessionId: sessionId || window.propertyDetails.lexUserId,
            sessionState: { 
                    sessionAttributes : window.propertyDetails.miPropertySessionAttributes 
            }
        };
        if(sessionId) {
            params.requestAttributes = {
                                            sourceWebPage: window.propertyDetails.sourceDomain
                                        }
        }
        if(isModalMessage){
            params.requestAttributes = {
                ...params.requestAttributes,
                roomId: message
            }
        }
        lexruntime.recognizeText(params, function(err, data) {
        
            if (err) {
              //alert(err.stack);
              //showError('Error:  ' + err.message + ' (see console for details)')
            }
            if (data) {
                window.propertyDetails.miPropertySessionAttributes = data.sessionState.sessionAttributes;
                let payload_response = {messages: data.messages, sessionState: data.sessionState, requestAttributes: data.requestAttributes || null}
                if(data.requestAttributes?.button && data.requestAttributes.button === "modal") {
                    //  handle modal responses - guest room modals
                    dispatch({
                        type: MODAL_RESPONSE_ACTIVE,
                        payload: payload_response
                    })
                }
                else {
                    // regular reply from bot - carousel, plain text, buttons
                    dispatch({
                        type: MESSAGE_SUCCESS, 
                        payload:  payload_response
                    });
                }
            }
        });

        
    } catch (error) {
        dispatch({type: MESSAGE_FAIL})
    }
}

// create a session - API Call
export const createSession = () =>  (dispatch) => {
    const sessionId = uuid();
    
    try {
        // create session ID
        window.propertyDetails.lexUserId = sessionId;
        store.dispatch(sendMessage('welcome', sessionId));
        dispatch({
            type: "SESSION_SUCCESS",
            payload: {
                session_id: sessionId,
                marsha_code:  window.propertyDetails.propertyMarshaCode
            }
        });
       
    } catch (e) {

    }
}

export const getSessionInfo = () => (dispatch) => {
    const marsha = window.propertyDetails.propertyMarshaCode;
    let session_info = localStorage.getItem(`session_id_${marsha}`);
    
    if(!!localStorage.getItem(`session_id_${marsha}`)) {
        // let [lexruntime, params] = getLexCredentials();
        var lexruntime = new AWS.LexRuntimeV2({apiVersion: '2020-08-07'});
        var params = {
            botId: 'UJNS4QLLJS',
            botAliasId: 'CCSSPDWXSF',
            localeId:'en_US',
            sessionId: session_info,
        };
    
        lexruntime.getSession(params, function(err, data) {
        
            if (err) {
            //alert(err.stack);
                console.log('*-*-*-*', err);
                localStorage.removeItem(`session_id_${marsha}`);
                localStorage.removeItem(`messages_${marsha}`);
                store.dispatch(createSession());
            }
            if (data) {
                console.log('**_SESSION_ACTIVE_**',data);
                window.propertyDetails.lexUserId = session_info;
                dispatch({
                    type: SESSION_ACTIVE, 
                    payload: {messages: JSON.parse(localStorage[`messages_${marsha}`])}
                });
            }
        });
    };
}