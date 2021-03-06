import React from 'react'

const TextBubbles = ({message, sendHandler, isBubbles, isSurvey}) => {
  // const displayMessage = isBubbles ? JSON.parse(message.content) : message.imageResponseCard;
  const displayMessage =  isBubbles ? message : message.imageResponseCard;
  const optionClick = ({button}) => {
    sendHandler(button.text, button.value);
  }
  return (
    // <span className="chat-response-message message-text">
      <div className={`imageResponseCard message-details`}>
      <div className={'message-title'}>
        { displayMessage.title}
      </div>
      <div>
        {
          displayMessage.buttons.map((button, index) => {
            return (
            <div className={'display-bubble'} key={index}>
              <button className = {'button-bubble'} onClick={() => optionClick({button})}>
                {isSurvey && <span className={`survey-bubble-${index+1}`}></span>}
                {button.text}
              </button>
            </div>)
          })
        }
      </div>
    </div>
    // </span>
    
  )
}

export default TextBubbles;