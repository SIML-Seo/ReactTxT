import { useEffect } from "react";
import "../style/TabList.css"

const TabList = ({notes , onDelete, onChangeText, onClickToTabLi}) => {
    let text = "";
    
    /**
     * Textarea 내의 문자열 실시간으로 변경
     * @param {*} e 
     */
    const onChange = (e) => {
        text = e.target.value;
        onChangeText(text);
    }

    /**
     * 로컬스토리지에 저장된 값과 노트에 저장된 값을 비교하여 해당 값이 아직 저장되지 않았다는 것을 표시
     * @param {*} id 
     * @returns 
     */
    const indicator = (id) => {
        let boolean = true;
        const note = notes.find(note => note.id === id)
        const saveText = localStorage.getItem(note.title);
        (saveText === note.text) ? boolean = true : boolean = false;
        return boolean
    }

    return(
        <div className = "note">
            <div className = "tabLi">
                {notes.map((note,index) => (
                    <>
                        <li className = {note.selected ? 'select' : null} key={note.id} 
                            onClick={() => onClickToTabLi(note.id)}>
                            {note.title}
                            {(indicator(note.id)) ? null : "*"}
                        </li>
                        <button key={index} onClick={() => onDelete(note.id)}>X</button>
                    </>
                ))}
            </div>
            <div className = "tabContainer">
                <textarea value = 
                    {notes.find(note => note.selected === true) ? 
                        notes.find(note => note.selected === true).text: ""} 
                onChange={onChange}/>
            </div>
        </div>
    )
}

export default TabList