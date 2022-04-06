import React from 'react'

const GuestRoomDetails = ({cardDetails, openCloseModal}) => {
    let imageSrc = cardDetails.photoTour.metadata[0].imageFile.includes('downsize=') ? cardDetails.photoTour.metadata[0].imageFile : `${cardDetails.photoTour.metadata[0].imageFile}?output-quality=70&interpolation=progressive-bilinear&downsize=300px:*`  

    // function to open and close the accordion
    const openAccordion = (accordionNumber) => {
        console.log(accordionNumber);
        var element = document.querySelector(`.accordion-body-${accordionNumber}`);
        var heading = document.querySelector(`.modal-accordion-${accordionNumber}`)
        element.classList.toggle('closed');
        heading.classList.toggle('active');
    }

  return (
    <>
      <div className={'place-image'} >
        <img src={imageSrc} alt="Place-name" />
      </div>
      <div className={'card-information'}>
        <h2>{cardDetails.name}</h2>
        <p className={'card-info__subtitle'}>{cardDetails.description}</p>
        <div className={'card-info__list'}>
            {
                cardDetails.details.length > 0 &&
                cardDetails.details.map((feature, index) => {
                    return (
                        <div key={index}>
                        <hr/>
                            <p key={index} className={`accordion-section_${index}`}>
                                <button className={`modal-accordion modal-accordion-${index}`} onClick={()=> {openAccordion(index)}}>{feature.type.description} <span className='icon-arrow-right-cropped'></span></button>
                                <div className={`accordion-body-${index} closed accordion-details`}>
                                    {
                                        feature.descriptions.map((listElement, i) => {
                                            return <p key={i}>{listElement}</p>
                                        })
                                    }
                                </div>
                            </p>
                        </div>)
                })
            }
        </div>
        <div className='details-footer'>
            <div className={'action-button'}>
              <button className='close-window slide-details-button' onClick={()=> openCloseModal(false)}>Close Window</button>
            </div>
            {/* {
              findTable && findTable.split(': ')[1] && 
              <div className={'action-button'}>
              <a className="slide-details-button link-button book-table" href={findTable.split(': ')[1]} target="_blank">
                  Find a Table
                  <span className="icon-up-arrow"></span> 
              </a>  
            </div>
            } */}
          </div>
      </div>
    </>
  )
}

export default GuestRoomDetails;