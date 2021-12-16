import { useEffect, useState } from "react"
import "../style/TabList.css"

const TabList = ({notes , onDelete, onChangeText, onClickToTabLi}) => {
    let text = "";
    
    const [textChecking, setTextChecking] = useState()

    const onChange = (e) => {
        text = e.target.value;
        setTextChecking(text)
        onChangeText(text);
    }

    const indicator = (id) => {
        let boolean = true;
        const note = notes.find(note => note.id === id)
        // console.log(note)
        const saveText = localStorage.getItem(note.title);
        // console.log(saveText) 하나의 세이브텍스트가 아님
        (textChecking === saveText) ? boolean = true : boolean = false;
        return boolean
    }

    return(
        <div className = "note">
            <div className = "tabLi">
                {notes.map(note => (
                    <>
                        <li className = {note.selected ? 'select' : null} key={note.id} 
                            onClick={() => onClickToTabLi(note.id)}>
                            {note.title}
                            {(indicator(note.id)) ? null : "*"}
                        </li>
                        <button key={note.id*4} onClick={() => onDelete(note.id)}>X</button>
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