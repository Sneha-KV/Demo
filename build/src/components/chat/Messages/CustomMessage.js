import React, {useState, useEffect} from 'react';

// Message components
import Categories from './Categories';
import TextBubbles from './TextBubbles';
import CarouselComponent from './CarouselComponent';
import PlainText from './PlainText';

const CustomMessage = ({message, isBubbles, isSurvey, isCarousel, sendHandler, openCloseModal}) => {

  const messageInfo = JSON.parse(message.content);

  
  // function to format contact information
  const getContactInfo = (message, isPrompt = true) => {
    let {address, city, country, postalCode, phoneNumber, state, emailAddress} = message
    let displayMessage = isPrompt ? messageInfo.contactinformation_prompt +':<br/>': '';
    if(address?.length > 0)
      displayMessage += `<br/>${address}, `;
    if(city?.length > 0)
      displayMessage += `<br/>${city}, `;
    if(country?.length > 0)
      displayMessage += `${country}, `;
    if(state?.length > 0)
      displayMessage += `<br/>${state.toUpperCase()}`;
    if(postalCode?.length > 0)
      displayMessage += ` ${postalCode}`;
    if(phoneNumber?.length > 0)
      displayMessage += `<br/><br/>Tel: <a href= 'tel:${phoneNumber}' class ="link-element">${phoneNumber}</a>`;
    if(emailAddress?.length > 0)
      displayMessage += `<br/><a href= 'mailto:${emailAddress}' class ="link-element">${emailAddress}</a>`;
    return displayMessage
  }
  
  // function to handle transportation
  const handleTransportation = () => {
    let [transportType, transportSubType] = messageInfo.type.split('_');
    let messageData = messageInfo.elements;
    let displayMessage = `<span>${messageData.title}</span><br/>`;
    if(transportSubType === "public") {
      let msg = ''
      for(let item in messageData) {
        let subData = '';
        if(item !== "title") {
          subData += `<br/><b>${item}</b><br/>`;
          messageData[item].forEach((ele, index)=> {
            subData +=  `${ele[0]}<br/>${ele[1]}<br/>`;
          })
        } 
        msg += subData ;
      }
      displayMessage = `<div class='tp-options tp-public'>${displayMessage}<div>${msg}</div></div>`
    } else if (transportSubType === "rentals") {
      let rentalData = messageData.data;
      let msg = '';
      for (let rental in rentalData) {
        let subData = `<br/><b>${rental}</b><br/>`;
        subData += getContactInfo(rentalData[rental], false);
        msg += subData
      }
      displayMessage = `<div class='tp-options tp-rentals'>${displayMessage}<div>${msg}</div></div>`

    }
   
    return displayMessage;
  }


  return (
    <>
        {
          isCarousel && messageInfo.type && messageInfo.type.includes('carousel') &&
          <CarouselComponent details = {messageInfo}  openCloseModal ={openCloseModal } sendHandler={sendHandler}/>
        }
        {
          messageInfo.type && messageInfo.type.includes("contactInformation") && 
          <>
            <span>
              <PlainText  message={{content: getContactInfo(messageInfo)}} number={Math.floor(Math.random()* 9999)}/>
            </span>
          </>
        }
        {
          messageInfo.type && messageInfo.type.includes("transportation") && 
          <span>
            <PlainText  message={{content: handleTransportation()}} number={Math.floor(Math.random()* 9999)}/>
          </span>
        }
        {
          messageInfo.type !== "carousel" && !isBubbles && !isSurvey && 
          <Categories messages={messageInfo} sendHandler={sendHandler}/>
        }

        {
          !messageInfo.type?.includes("carousel") && (isBubbles || isSurvey) && messageInfo.buttons &&
          <TextBubbles message={messageInfo} sendHandler={sendHandler} isBubbles={true} isSurvey={isSurvey}/>
        }
       
      
    </>

  )
}

export default CustomMessage