## Marriott VDA


####

A chat bot application for the Marriott properties 



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

var botElement = document.createElement('div');
div.id = 'chat-bot-root';
document.body.appendChild(botElement)
var script = document.createElement('script');
script.setAttribute(
  'src',
  'http://vda-fe-code.s3-website-us-east-1.amazonaws.com/js/bundle.js',
);

script.setAttribute('async', '');

// 👇️ optionally set script to be treated as JS module
// script.setAttribute('type', 'module');

script.onload = function handleScriptLoaded() {
  console.log('script has loaded');
};

script.onerror = function handleScriptError() {
  console.log('error loading script');
};
document.body.appendChild(script);

// styles
var link = document.createElement('link'); 

// set the attributes for link element
    link.rel = 'stylesheet'; 

link.type = 'text/css';

link.href = 'http://vda-fe-code.s3-website-us-east-1.amazonaws.com/css/bundle.css'; 

// Get HTML head element to append 
// link element to it 
document.getElementsByTagName('head')[0].appendChild(link); 