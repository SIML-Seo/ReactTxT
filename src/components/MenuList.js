import {useState} from "react";
import LoadList from "./LoadList"
import '../style/MenuList.css'


const MenuList = ({notes, setNotes, nextId, onNewTab}) => {
    const [saveData, setSaveData] = useState([])
    const [modalOn, setModalOn] = useState(false)

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
        setNotes(notes.map(note => note.selected ? {...note, title: saveTitle} : note))
        if(!saveData.includes(saveTitle)){
            setSaveData(saveData.concat(saveTitle))
        }
        localStorage.setItem(saveTitle, text);
        console.log("onSave!!!")
    }
    
    const onLoad = () => {
        setModalOn(!modalOn)
    }

    return(
        <div className = "menu">
            <button className = "saveBtn" onClick={() => onSave()}>SAVE</button>
            <button className = "loadBtn" onClick={() => onLoad()}>LOAD</button>
            <button className = "saveAsBtn" onClick={() => onSaveAs()}>SAVEAS</button>            
            <button className = "tabBtn" onClick={() => onNewTab()}>TAB</button>
        {modalOn && (
            <LoadList notes = {notes} setNotes = {setNotes} saveData = {saveData} nextId = {nextId} onLoad = {onLoad}>
            </LoadList>
        )}
        </div>
    )
}

export default MenuList;