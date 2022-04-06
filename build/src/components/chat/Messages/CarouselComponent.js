import React, { useState } from 'react';
import '../../../assets/sliderStyles.scss';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/lazy";
import "swiper/css/pagination";
// import required modules
import { Keyboard, Lazy, Navigation, Pagination } from "swiper";



const CarouselComponent = ({details, openCloseModal, sendHandler}) => {

    const [ showModal, setShowModal] = useState({show: false, data: null});  
    const carouselElements = details.elements;
    let [type, intentType] = details.type.split('_');
    const intentList = ["guestroom", "golf", "spa", "fitness", "childrenactivities", "localattractions", "swimming", "beach", "pool"];
    const imageParams = '?output-quality=60&interpolation=progressive-bilinear&downsize=220px:*';
    
    // console.log(carouselElements); 
    const openSlide = (slideData) => {
        openCloseModal(true, {modalType: intentType, modalInfo: slideData});
        setShowModal({
            show: true,
            data: slideData
        })
    }

    // Guest Room Modal open call
    const guestRoomDetails = (roomId) => {
        sendHandler(roomId, '', true);
    }

    // function to handle description if if it's too long 
    const getDescription = (des_text, showMoreVisible) => {
        if(des_text.length < 200) return des_text;
        return (
            <>
                {showMoreVisible ? des_text.substring(0,200) : des_text}
                
                <button onClick={()=> getDescription(des_text, !showMoreVisible)}>{!showMoreVisible ? ' ...show less' : ' ...show more'}</button> 
            </>
        );

    }
    return (
    <section className='slider'>
    
    <Swiper 
        className="mySwiper" 
        pagination={{
            clickable: true,
            dynamicBullets: carouselElements.length > 12,
            dynamicMainBullets: 8
        }} 
        navigation={true} lazy={true}  
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard, Lazy, Navigation, Pagination]} 
        slidesPerView={"auto"} spaceBetween={7} >
        {
            carouselElements.map((slide, index) => {
                let elementData = slide;
                let imageURL = '';
                if(intentType === "dining") {
                    elementData = slide.imageResponseCard.title.split('||');
                    imageURL = slide.imageResponseCard.imageUrl;
                    var [title, cusine, onProperty, dressCode, phone, openHours, websiteUrl,  findTable] = [...elementData]

                }
                else if(intentList.includes(intentType)) {
                    imageURL = slide.image_url;
                }
                imageURL = imageURL ? imageURL.includes('downsize=') ? `${imageURL.split('?output-quality')[0]}${imageParams}` : `${imageURL}${imageParams}` : '';

                return (
                <SwiperSlide key={index} >
                    <div className={`slide-wrapper ${imageURL.length > 0 ? 'image-slider': 'not-image-slider'}`}>
                        {imageURL && <img className= {'slide-image image'} alt={'location-image'} src={imageURL} />}
                        <div className={`slide-info slide-info-${imageURL.length}`}>
                            {
                                intentType === "dining" &&
                                <>
                                        <h5 className='slide-title' onClick={() => openSlide(slide.imageResponseCard)}><b>{title}</b></h5>
                                        
                                            <span className ='additional-info'>
                                                <span>{cusine.includes('Cusine:') ? cusine.split(': ')[1] : ''}</span>
                                                <span>
                                                    {
                                                            websiteUrl && findTable &&
                                                              <>
                                                                <p className="link-detail-container call-action-section">
                                                                    {  
                                                                        websiteUrl && websiteUrl.split(': ')[1] && 
                                                                        <span className="link-detail-text ">
                                                                            <a className="link-container link-button link-element" href={websiteUrl.split(': ')[1]} target="_blank">Visit Website</a>
                                                                        </span>
                                                                    
                                                                    }
                                                                    {
                                                                        findTable && findTable.split(': ')[1] &&
                                                                        
                                                                        <a className="slide-details-button link-element link-button book-table" href={findTable.split(': ')[1]} target="_blank">
                                                                            Find a Table
                                                                        </a> 
                                                                    }
                                                                </p>
                                                              </>
                                                        
                                                    }
                                                </span>
                                            </span>  
                                </>
                            }
                            {
                                intentList.includes(intentType) &&
                                <>
                                    <h4 className='slide-title'>
                                        {
                                            intentType === "guestroom" ? slide.name : 
                                            <>
                                            <a className="link-element" href={slide.url} target="_blank">{slide.name}</a>
                                            </>
                                        }
                                        
                                    </h4>
                                    <div className={'guest-room-details additional-info'}>
                                        {/* room details, view rates */}
                                        <div >
                                            {
                                                intentType === "guestroom" &&
                                                <div className="card-action-items">
                                                    <button className="card-details-button" onClick={()=> guestRoomDetails(slide.id)}> {details.buttons[0]} </button>
                                                    <a className="link-element" href={slide.price_details} target="_blank">{details.buttons[1]}</a>
                                                </div>
                                            }
                                            {
                                                intentType !== "guestroom" && 
                                                <>  
                                                    
                                                    <div className={'slide-extra-info'}>
                                                        <div><span>{slide.distance}</span></div>
                                                        {/* <div>{slide.description && getDescription(slide.description, true)}</div> */}
                                                        <div>{slide.description}</div>
                                                        <div>{slide.details?.toString()}</div>
                                                        <div>{slide.operation_hours}</div>
                                                        <div>{slide.fees ? 'Fee: ' : ''}{slide.fees}</div>
                                                        <div>
                                                            {
                                                                slide.phone && 
                                                                <span>
                                                                    <span className="icon-phone"></span> &nbsp;
                                                                        <span dangerouslySetInnerHTML={{__html: slide.phone}}></span>
                                                                </span>
                                                            }
                                                        </div>

                                                    </div>
                                                </>
                                            }
                                        </div>
                                       
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </SwiperSlide>)
            })
        }
      </Swiper>
    </section>);

}




export default CarouselComponent;