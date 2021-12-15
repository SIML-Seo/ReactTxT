// import { useEffect, useState } from "react"
import "../style/TabList.css"

const TabList = ({notes , onDelete, onChangeText, onClickToTabLi}) => {
    const onChange = (e) => {
        let texts = e.target.value
        console.log("Texts : " + texts)
        onChangeText(texts);
    }

    return(
        <div className = "note">
            <div className = "tabLi">
                {notes.map(note => (
                    <>
                        <li className = {note.selected ? 'select' : null} key={note.id} onClick={() => onClickToTabLi(note.id)}>{note.title}</li>
                        <button key={note.id*4} onClick={() => onDelete(note.id)}>X</button>
                    </>
                ))}
            </div>
            <div className = "tabContainer">
                <textarea value = 
                    {notes.find(note => note.selected === true) ? 
                    notes.find(note => note.selected === true).text : ""} 
                onChange={onChange}/>
            </div>
        </div>
    )
}

export default TabList