


####

A chat bot application for the  properties 



#### Example:

This project is currently in development. Users can open the chat bot deployed on the property portal and ask questions manually or can select options 

#### Example: 
After launching the bot, you can ask questions like "What are the Dining Options?", "What is the parking/ covid/ smoking policy?" etc.

### Current Intents:

This version has prompts/ responses for:

1. Hotel Information - Check In/ Check Out
2. Internet/ Wifi Access
3. Smoking Policy
4. Covid policy
5. Accepted Payments
6. Survey / Feedback


## Installation and Setup Instructions
 

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000`  

To Build :
 `npm run build`

To get the project as one JS file:
This command runs the custom webpack config file and returns one file of each type

`npm run wStart`

## Launch code
var botData = window.dataLayer;
var bot = document.createElement('iframe');
bot.id= "chat-bot-iframe"
bot.src = 'http://vda-fe-code.s3-website-us-east-1.amazonaws.com/';
bot.style.right = "24px";
bot.style.bottom = "24px";
bot.style.position = "fixed";
bot.style.zIndex = "10010";
bot.width = "100%";
bot.height = "90%";
bot.title="marriot-chat-frame";
bot.style.opacity = 1;
bot.style.maxWidth = '375px';
bot.style.maxHeight = '725px';
bot.style.width = '360px';
bot.style.display = 'none';
bot.style.border = 'none';
bot.style.borderRadius = '14px';
document.body.appendChild(bot);
setTimeout(()=> {
var botIframe = document.getElementById('chat-bot-iframe');
botIframe.contentWindow.postMessage(botData, '*');
botIframe.style.display = 'block';
}, 3000);
