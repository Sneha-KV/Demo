import React from 'react';
import DiningSlideDetails from './Messages/DiningSlideDetails';
import GuestRoomDetails from './Messages/GuestRoomDetails';

const ModalOverlay = ({modaldata, openCloseModal, isGuestRoom}) => {
  
  var {modalType, modalInfo} = {...modaldata};
  // test data
//   isGuestRoom = true;
//   modaldata = {
//     "modal_view": {
//         "node": {
//             "id": "wasbd.KGSR",
//             "name": "View Room",
//             "description": "Guest room, 1 King, City view",
//             "longDescription": "City View, 1 King, Mini fridge, 343sqft/31sqm, Wireless internet, for a fee, Coffee/tea maker, 32in/81cm LCD TV",
//             "bedCounts": [
//                 1
//             ],
//             "details": [
//                 {
//                     "type": {
//                         "description": "Room Overview"
//                     },
//                     "descriptions": [
//                         "City View"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Beds and Bedding"
//                     },
//                     "descriptions": [
//                         "Maximum Occupancy: 3",
//                         "1 King",
//                         "Rollaway beds not permitted",
//                         "Cribs permitted: 1",
//                         "Maximum cribs/rollaway beds permitted: 1",
//                         "Pillowtop mattress, and Duvet"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Room Features"
//                     },
//                     "descriptions": [
//                         "343sqft/31sqm",
//                         "Air-conditioned",
//                         "This room is non-smoking",
//                         "Connecting rooms are available (for some rooms)"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Bath and Bathroom Features"
//                     },
//                     "descriptions": [
//                         "Shower",
//                         "Hair dryer"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Furniture and Furnishings"
//                     },
//                     "descriptions": [
//                         "Safe, in room, for a fee",
//                         "Outlet with dual voltage adaptors",
//                         "Desk, electrical outlet"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Food & Beverages"
//                     },
//                     "descriptions": [
//                         "Bottled water, for a fee",
//                         "Coffee maker / tea service"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Kitchen Features"
//                     },
//                     "descriptions": [
//                         "Mini-refrigerator"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Internet and Phones"
//                     },
//                     "descriptions": [
//                         "Phones",
//                         "Phone features: cordless phone, voicemail, and speaker phone",
//                         "High speed Internet, for a fee",
//                         "Wireless Internet, for a fee"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Entertainment"
//                     },
//                     "descriptions": [
//                         "TV features: remote control, 32in/81cm, and LCD screen",
//                         "Plug-In High Tech room",
//                         "Premium movie channels",
//                         "Cable/satellite",
//                         "CNN, ESPN, and HBO"
//                     ]
//                 },
//                 {
//                     "type": {
//                         "description": "Accessible Room Features"
//                     },
//                     "descriptions": [
//                         "This room type offers mobility accessible rooms",
//                         "This room type offers accessible rooms with roll in showers",
//                         "This room type does not offer hearing accessible rooms"
//                     ]
//                 }
//             ],
//             "isMarsha": null,
//             "maxOccupancy": 3,
//             "photoTour": {
//                 "id": "KGSR",
//                 "name": null,
//                 "captions": {
//                     "alternateText": null,
//                     "title": null,
//                     "marketingCaption": null
//                 },
//                 "metadata": [
//                     {
//                         "imageFile": "https://cache.marriott.com/content/dam/marriott-hws/global/mi-photo-coming-soon-hor-clsc.jpg"
//                     }
//                 ]
//             }
//         }
//     },
//     "type": "model_guestroom"
// }
  // 
  if(isGuestRoom)
   {
     modalType = modaldata.type.split("_")[1];
     modalInfo = modaldata.modal_view?.node;
    }
    // console.log(modalType, modalInfo)
  return (
    <div>
        {
            modalType === 'dining' && <DiningSlideDetails cardDetails={modalInfo} openCloseModal={openCloseModal}/>
            
        }
        {
          modalType === "guestroom" && 

          <GuestRoomDetails cardDetails={modalInfo} openCloseModal = {openCloseModal}/>
        }
    </div>
  )
}

export default ModalOverlay