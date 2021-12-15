import {useState, useRef} from "react";
import SaveList from "./SaveList"
import '../style/MenuList.css'


const MenuList = ({notes, setNotes, onLoad, onNewTab}) => {
    const [saveData, setSaveData] = useState([])
    const nextTitleId = useRef(1)

    const onSaveClick = () => {
        let saveTitle = prompt("저장할 타이틀을 정해주세요.")
        if(!saveTitle) saveTitle = "noName";
        let text = notes.find(note => note.selected).text
        return [saveTitle, text];
    }
    
    const onSave = () => {
        let [saveTitle, text] = onSaveClick();
        for(let i = 0; i < saveData.length; i++){
            if(saveData[i] === saveTitle){
                saveTitle += " ( " + nextTitleId.current + " ) "
                nextTitleId.current += 1;
            }
        }
        setNotes(notes.map(note => note.selected ? {...note, title: saveTitle} : note))
        setSaveData(saveData.concat(saveTitle))
        localStorage.setItem(saveTitle, text);
        console.log("onSave!!!")
    }
    
    return(
        <div className = "menu">
            <button className = "saveBtn" onClick={() => onSave()}>SAVE</button>
            <button className = "loadBtn" onClick={() => onLoad()}>LOAD</button>
            <button className = "saveAsBtn">SAVEAS</button>            
            <button className = "tabBtn" onClick={() => onNewTab()}>TAB</button>
        <SaveList>
        </SaveList>
        </div>
    )
}

export default MenuList;