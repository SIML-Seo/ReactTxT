import { useState } from "react";

const SaveList = () => {
    const [loadFlag, setLoadFlag] = useState(false);


    return(
        <div className = "save_container">
            {
                (loadFlag) ? <div classNAme = "notselected"></div> : null 
            }
        </div>
    )
}

export default SaveList;

/**
 * 윈도우 창 중앙에 띄우게 하기
 */