import { useState, useEffect } from 'react';
// import { Loading } from 'react-loading-dot';
import ChatLoader from '../chat/ChatLoader';
import CustomMessage from './Messages/CustomMessage';

// import Categories from './Messages/Categories';
import PlainText from './Messages/PlainText';
import TextBubbles from './Messages/TextBubbles';
import botLogo from '../../assets/icons/chatmiicon.svg';
const BotResponse = ({messageType, displayData, sendHandler, openCloseModal, order }) => {
  let messages = messageType !== "loader" ? displayData.messages: null;
  const isBubbles = messages ? (displayData.requestAttributes?.button === "bubble" ? true : false) : false;
  const isSurvey = displayData?.requestAttributes?.button === "survey"
  const isCarousel = displayData?.requestAttributes?.carousel === "yes";
  let carouselMessages = [];

  const botavatar = (<div className='bot-avatar-section bot-avatar-icon'>
                      <span className="chat-chat-bot-avatar">
                        <img className={'bot-avatar'} alt ="bot-icon" src={botLogo} />
                      </span>
                    </div>);

  const formatMessages = (displayMessages) => {
    let formattedMessages = (
    <span className={`chat-response-message message-text ${displayMessages[0]?.contentType.toLowerCase()}`}>
      <>
        { 
          displayMessages && 
          displayMessages.map((message, index) => {
            let msg = <></>;
                if(message.contentType === "PlainText")
                  msg =(<span  key={index}>
                    <PlainText  message={message} number={order}/>
                  </span>) ;
                if(message.contentType === "CustomPayload")
                    msg = <CustomMessage key={index} message={message} isBubbles={isBubbles} isSurvey={isSurvey} sendHandler={sendHandler} isCarousel={isCarousel} openCloseModal={openCloseModal}/>
                if(message.contentType === "ImageResponseCard" && !!message.imageResponseCard.buttons)
                    msg = <TextBubbles key={index} message={message} sendHandler={sendHandler}/>
            return msg;
          })
        }
      </>
    </span>);
   return formattedMessages;
  }



  return (
    <>
      {
        
        <div className="chat-response-row">
        {botavatar}
          {
            messages && 
              formatMessages(messages)
          }
          
          {
            messageType === "loader" &&
            <span className="chat-response-message message-text loader">
             <ChatLoader />
            </span>
          }
      </div>}
      
    </>
  );
};

export default BotResponse;
