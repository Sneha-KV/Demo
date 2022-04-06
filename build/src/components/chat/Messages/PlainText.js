import { useEffect, useState, useRef } from "react";

const defaultHeight = 72;

const ToggleButton = ({ isExpanded, onClick }) => {
  return (
    <span className={`read-or-hide btn-toggle `} onClick={onClick}>
      {isExpanded ? "Show Less" : "Show More"}
      {/* <span className={`${isExpanded ? 'icon-arrow-up' : 'icon-arrow-down'}`}></span> */}
    </span>
  );
};

const PlainText = ({ message, number }) => {
  // console.log(number)
  const text = message.content;
  const textMessage = <span dangerouslySetInnerHTML={{__html: text}}></span>
  const [heightCurrent, setHeightCurrent] = useState(defaultHeight);
  const [heightMax, setHeightMax] = useState(defaultHeight);
  const [heightMin, setHeightMin] = useState(defaultHeight);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const displayText = useRef(null);
  const [ isHeightSet, setHeight] = useState(false);

  useEffect(() => {
    const element = document.querySelector(`.text-display-${number}`);
    const heightClient = element?.clientHeight || defaultHeight;
    const scrollClient = element?.scrollHeight || defaultHeight;
    if (heightClient !== scrollClient) {
      setIsOverflow(true);
      setHeightMax(scrollClient);
      setHeightMin(heightClient);
      setHeightCurrent(heightClient);
    }
    setHeight(true);
  }, [text, number]);

  const handleClickBtn = () => {
    setHeightCurrent(isExpanded ? heightMin : heightMax);
    setIsExpanded((prev) => !prev);
  };
  return (
    <p className="text">
      {
        <>
          <p className={`text-display-${number} ${ !isHeightSet || ( isHeightSet && isOverflow) ? 'overflow '+ (!isExpanded ? 'fade': '') : 'not-overflow'} `} ref={displayText} style={{ height: `${heightCurrent}px` }}>
            {textMessage}
          </p>
          {isOverflow && <ToggleButton isExpanded={isExpanded} onClick={handleClickBtn}/>}
        </>
      }

    </p>
  );
};

export default PlainText;
