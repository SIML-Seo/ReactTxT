import {useState, useRef} from "react";
import SaveList from "./SaveList"
import '../style/MenuList.css'


const MenuList = ({notes, setNotes, onNewTab}) => {
    const [saveData, setSaveData] = useState([])

    const nextTitleId = useRef(1)

    const onSave = () => {
        let title = notes.find(note => note.selected).title
        let text = notes.find(note => note.selected).text
        if(saveData.includes(title)){
            onSaveLocalStorage(title, text)
            return;
        }
        let saveTitle = prompt("저장할 타이틀을 정해주세요.")
        if(!saveTitle) saveTitle = "noName";
        onSaveLocalStorage(saveTitle, text);
    }
    
    const onSaveAs = () => {
        nextTitleId.current = 1;
        const currentTitle = notes.find(note => note.selected).title;
        let saveAsTitle = prompt("다시 저장할 타이틀을 정해주세요.")
        if(!saveAsTitle) return;
        if(saveAsTitle === currentTitle){
            alert("기존에 등록한 타이틀입니다.")
            return;
        }
        let text = notes.find(note => note.selected).text
        onSaveLocalStorage(saveAsTitle, text);
        setSaveData(saveData => saveData.filter(save => save !== currentTitle))
        console.log(saveData)
        localStorage.removeItem(currentTitle)
    }

    const onSaveLocalStorage = (saveTitle, text) => {
        // for(let i = 0; i < saveData.length; i++){
        //     if(saveData[i] === saveTitle){
        //         saveTitle += " ( " + nextTitleId.current + " ) "
        //         nextTitleId.current += 1;
        //     }
        // }
        setNotes(notes.map(note => note.selected ? {...note, title: saveTitle} : note))
        // setSaveData(saveData.concat(saveTitle))
        if(!saveData.includes(saveTitle)){
            setSaveData(saveData.concat(saveTitle))
        }
        localStorage.setItem(saveTitle, text);
        console.log("onSave!!!")
    }
    
    const onLoad = () => {

    }
    //불러오기 


    return(
        <div className = "menu">
            <button className = "saveBtn" onClick={() => onSave()}>SAVE</button>
            <button className = "loadBtn" onClick={() => onLoad()}>LOAD</button>
            <button className = "saveAsBtn" onClick={() => onSaveAs()}>SAVEAS</button>            
            <button className = "tabBtn" onClick={() => onNewTab()}>TAB</button>
        <SaveList>
        </SaveList>
        </div>
    )
}

export default MenuList;