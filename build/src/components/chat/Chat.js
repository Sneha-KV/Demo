import {useState, useEffect, useRef, useCallback} from 'react';
import { connect} from "react-redux";


import { userMessage, sendMessage } from '../../actions/lexbot';

import BotResponse from './BotResponse';
import ChatHeader from './ChatHeader';
import GlobalProperties from '../../properties/GlobalProperties';
import UserMsgContainer from './UserMsgContainer';
import ModalOverlay from './ModalOverlay'
import ChatIcon from './ChatIcon';
import botLogo from '../../assets/icons/chatmiicon.svg';
// import Categories from './Categories';


const Chat = ({chat, modalInfo, userMessage, sendMessage}) => {

    const [message, setMessage] = useState("");
    const lastMessage = useRef(null);
    const [openChat, setOpenChat] = useState(false);
    const [welcomeMsg, setWelcomeMsg] = useState(window.propertyDetails.brandMessages.welcome_msg || window.propertyDetails.welcomeMessage);
    const [loader, setLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modaldata, setModalData] = useState(null);
    const chatInputRef = useRef(null);

    // function to make the chat scroll to bottom automatically
    const scrollToBottom = () => {
            lastMessage.current.addEventListener('DOMNodeInserted', event => {
              const { currentTarget: target } = event;
              target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
    }

    // function to 
    const setInputFocus = () => {
        if(chatInputRef.current) chatInputRef.current.focus()
    }

    // function to extract any PII (Personal Identifiable Information) and mask them
    const maskPII = (messageText) => {
        // const string = 'test1 +513 410-4909 test2 +1 671-765-0091 +33442207724';
        let pii_data = [],
        maskedText = messageText;
        const regexp = new RegExp("(\\({0,1}[0-9]{3,4}\\){0,1}\\s{0,1}-{0,1}[0-9]{2,4}-{0,1}\\s{0,1}[0-9]{4}\\s{0,1}[0-9]*)+","g");
        pii_data = [...messageText.matchAll(regexp)];

        if(pii_data.length === 0) return messageText; // no PII
        pii_data.forEach(pii_element => {
            maskedText = maskedText.replace(pii_element[0], 'XXXX');
        });

        return maskedText;
    }

    const getDateandTime = () => {
        var today = new Date();
        const lang = document.documentElement.lang || 'en-US';
        const time =   today.toLocaleString(lang, { hour: 'numeric', minute: 'numeric', hour12: true })
        const dayName =  today.toLocaleDateString( lang, { weekday: 'long' });
        return `${dayName} ${time}`;
    }

    // User message handler - when enter key is hit
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;
        if(code !== 13) return;
        e.target.disabled = true;
        // maskPII();
        userRequest();
        e.target.disabled = false; 
        setInputFocus();
    }

    // User message handler - when arrow button is clicked
    const handleSendButtonClick = () => {
        if(!message) return;
        userRequest(message);
        setInputFocus();  
    }


    // function to handle send messages when user selects/ clicks any options from previous responses (bubbles, cat list, carousel, api call for guest room modal etc)
    const requestMessage = (messageText, messageValue ='', openOverlay = false) => {
        if(!openOverlay) {
            setMessage(messageText);
            setLoader(true);
        }
        userRequest(messageText, messageValue, openOverlay);
       
        setInputFocus();
    }

    // function to call send message dispatcher
    const userRequest = (userText = message, messageVal = '', overlayMessage ) => {
        if(!overlayMessage) {
            userText = maskPII(userText);
            userMessage(userText);
        }
            
        // if(!overlayMessage)
        sendMessage(messageVal || userText, '', overlayMessage);
        setMessage("");
    }
    
    const openCloseChat = () => {
        setOpenChat(!openChat);
    }

    const openCloseModal = (value, data = null) => {
        setShowModal(value);
        if(data) setModalData(data);
        if(modalInfo.requestAttributes.button === "modal" && !value) {
            userMessage('', true)
        }
    }

    useEffect(()=> {
        setInputFocus();
       sendMessage('welcome', true);
       
    }, [])
    
    useEffect( scrollToBottom, [chat]);
   
  return (
    <>
        <div className={`chat-open-icon ${openChat ? 'is-closed' : ''}`}>
            <ChatIcon handleClick={openCloseChat}/>
        </div>
        <div className={`message-container chat ${window.propertyDetails.propertyBrandCode.toLowerCase()} ${openChat ? 'is-open' : 'is-closed'}`} >
            <ChatHeader minimizeChat={openCloseChat}/>
            <main className="conversation-container">
                <div className='conversation-box'>
                    <div className='conversation' id="conversation" ref={lastMessage}>
                        <p className = "chat-header-chat-start-time date-time">{getDateandTime()}</p>
            
                        <div className="chat-response-row">
                        <div className='bot-avatar-section'>
                            <span className="chat-chat-bot-avatar">
                                <img className={'bot-avatar'} alt ="bot-icon" src={botLogo} />
                                {/* <img className={'bot-avatar'} src="https://petsandvetsanimalhospital.com/images/chatmiicon.svg"/> */}

                            </span>
                        </div>
                        <span className="chat-response-message message-text welcome-msg">
                                {welcomeMsg}
                            </span>
                            
                        </div>
                        { 
                            chat.length > 0 ? chat.map((msg, index) => {
                                return (
                                    msg.type === "user" ? 
                                    <UserMsgContainer key={index} messageText={msg.message} sendHandler={requestMessage}/> :
                                    <BotResponse key={index} order={index} className={'bot-response'} displayData={msg.message}  sendHandler={requestMessage} openCloseModal={openCloseModal}/>
                                    )}): ""
                        }
                        {  
                            chat.length > 0 && chat[chat.length - 1].type === "user" &&
                            <BotResponse  className={'bot-response'} messageType={'loader'} sendHandler={requestMessage}/>
                        }
                        
                    </div>
                    {/* user input section */}
                    <div className={'chat-input-form'}>
                        <span className={'more-info icon-more'}></span>
                        <input 
                        autoFocus
                        ref={chatInputRef}
                        id="chatbox-message" 
                        onChange={(e) => setMessage(e.target.value)} 
                        onKeyPress={handleClick} 
                        value={message || ""}
                        placeholder='Type a message...'/>
                        <button type="submit" className="chat-submit" onClick={handleSendButtonClick}>
                            <span className="right-forward-arrow icon-forward-arrow" ></span>
                        </button>
                    </div>
                </div>
                {
                    (showModal || (modalInfo.requestAttributes && modalInfo.requestAttributes.button === "modal")) && 
                    <div className="modal-section">
                        <div className="test"></div>
                        <div id="myModal" className="modal">
                            <div className="modal-content">
                                <span className="icon-plus close" onClick={() => openCloseModal(false)}></span>
                                <ModalOverlay modaldata={showModal ? modaldata : JSON.parse(modalInfo.messages[0].content)} openCloseModal = {openCloseModal} isGuestRoom = {!!modalInfo.messages}/>
                            </div>
        
                        </div>
                    </div>
                
                }
            </main>
        </div>
  </>
  );
};

const mapStateToProps = (state) => ({
    chat : state.lexbot.messages,
    modalInfo: state.lexbot.modalData
})
export default connect(mapStateToProps, {userMessage, sendMessage})(Chat);
