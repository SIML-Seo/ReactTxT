import { useEffect, useState } from "react"
import "../style/TabList.css"

const TabList = ({notes , onDelete, onClickToTabLi}) => {
    const tmp = (notes.find(note => note.selected === true)) ? notes.find(note => note.selected === true).text : "";
    
    const [text, setText] = useState(tmp)
    useEffect(() => {
        setText((notes.find(note => note.selected === true)) ? notes.find(note => note.selected === true).text : "")
    }, [notes])

    const onChange = (e) => {
        setText(e.target.value);
    }

    return(
        <div className = "note">
            <div className = "tabLi">
                {notes.map(note => (
                    <>
                        <li key={note.id} onClick={() => onClickToTabLi(note.id)}>{note.title}</li>
                        <button key={note.id*4} onClick={() => onDelete(note.id)}>X</button>
                    </>
                ))}
            </div>
            <div className = "tabContainer">
                <textarea value = {text} onChange={onChange}/>
            </div>
        </div>
    )
}

export default TabList