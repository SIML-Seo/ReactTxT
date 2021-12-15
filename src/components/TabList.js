// import { useEffect, useState } from "react"
import "../style/TabList.css"

const TabList = ({notes , onDelete, onChangeText, onClickToTabLi}) => {
    // const textTmp = (notes.find(note => note.selected === true)) ? notes.find(note => note.selected === true).text : "";

    // const [texts, setTexts] = useState("")
    
    // useEffect(() => {
    //     console.log("Tab useEffet!!!")
    //     setTexts((notes.find(note => note.selected === true)) ? notes.find(note => note.selected === true).text : "")
    // }, [notes])

    // useEffect(() => {
    // }, [texts])
    
    const onChange = (e) => {
        let a = e.target.value
        console.log(a)
        onChangeText(a);
        // setTexts(e.target.value);
        // console.log("onChange Text : " + texts)
        // onChangeText(texts)
    }
    //동기적으로 처리할 방법 생각하기, 아니면 text를 따로 처리할 방법
    //note를 들고와서 selected 트루인것만 text 가져오고 유즈이펙트는 지운다
    //setNotes를 들고와서 수정된 사항을 저장한다

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
                <textarea value = {notes.find(note => note.selected === true) ? notes.find(note => note.selected === true).text : ""} onChange={onChange}/>
            </div>
        </div>
    )
}

export default TabList