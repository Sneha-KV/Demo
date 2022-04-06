import React from 'react'

const DiningSlideDetails = ({ cardDetails, openCloseModal }) => {
    
    let elementData = cardDetails.title.split('||');
    let [title, cusine, onProperty, dressCode, phone, openHours, websiteUrl,  findTable] = [...elementData]
    console.log(elementData)
    cusine = cusine.includes('Cusine:') ? cusine.split(': ')[1] : '';
    phone = phone.includes('Phone:') ? phone.split(': ')[1] : '';
    dressCode = dressCode.includes('Dress Code') ? dressCode.split(': ')[1] : '';
    let imageSrc = cardDetails.imageUrl.includes('downsize=') ? cardDetails.imageUrl : `${cardDetails.imageUrl}?output-quality=70&interpolation=progressive-bilinear&downsize=300px:*`  
    let timings = [];
    const showTimings = (openTimings) => {
      
      let timingsArray = JSON.parse(openTimings);
      timings = timingsArray.map((time)=> {
        return`${time.open} - ${time.close}`
      })
      return timings;
    }
    
  return (
    <>
      <div className={'place-image'} >
        <img src={imageSrc} alt="Place-name" />
      </div>
      <div className={'card-information'}>
        <h2>{elementData[0]}</h2>
        {cusine.length > 0 && <p className={'card-info__small'}>{cusine}</p>}
        <p className={'card-info__subtitle'}>{cardDetails.subtitle}</p>
        <div className={'card-info__list'}>
          {
            openHours &&
            <>
              <p className='hours'>
                <span className="icon-clock"></span> &nbsp;
                <span className="open-hours">
                  <span>{`Open hours: `}&nbsp;</span>
                <span>
                {
                  showTimings(openHours)[0]
                  }<br/>
                  {showTimings(openHours)[1]}
                </span>
             
                </span>
              </p>
              <hr/>
            </>
            
          }
          {
            phone && 
            <>
              <p className='phone'>
                <span className="icon-phone"></span> &nbsp;
                {/* <span>{phone}</span> */}
                <a href= {`tel:${phone.split(': ')[1]}`} className ="link-element">{phone}</a>
              </p>
              <hr/>
            </>
            
          }
          
          {
            dressCode && 
            <>
            <p className='dressCode'>
              <span className="icon-hangers"></span> &nbsp;
              <span>{dressCode}</span>
            </p>
            <hr/>
            </>
            
          }
          
          {
            false && 
            <>
            <p className='menu'>
            <span className="icon-dining"></span> &nbsp;
            <span>{'See Menu'}</span>
          </p>
          <hr/>
          </>
          }
          {
            websiteUrl && websiteUrl.split(': ')[1] &&
              <>
                <p className="link-detail-container ">
                    <span className="icon-globe"></span> &nbsp;
                    <span className="link-detail-text "><a className="link-container link-button" href={websiteUrl.split(': ')[1]} target="_blank">Visit Website</a></span>
                </p>
                <hr />
              </>
            
          }
          <p>&nbsp;</p>
          <div className='details-footer'>
            <div className={'action-button'}>
              <button className='close-window slide-details-button' onClick={()=> openCloseModal(false)}>Close Window</button>
            </div>
            {
              findTable && findTable.split(': ')[1] && 
              <div className={'action-button'}>
              <a className="slide-details-button link-button book-table" href={findTable.split(': ')[1]} target="_blank">
                  Find a Table
                  <span className="icon-up-arrow"></span> 
              </a>  
            </div>
            }
          </div>
        </div>
        
      </div>
    </>
  )
}

export default DiningSlideDetails;