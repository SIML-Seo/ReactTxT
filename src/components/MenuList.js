import {useState} from "react";
import LoadList from "./LoadList"
import '../style/MenuList.css'
import { storageRef, auth } from "../firebase.js"

const MenuList = ({notes, setNotes, nextId, onNewTab}) => {
    const [saveData, setSaveData] = useState([])
    const [modalOn, setModalOn] = useState(false)

    const uId = (!auth.currentUser) ? "" : auth.currentUser.uid;
    
    /**
     * 저장된 데이터일 경우 바로 저장, 새로운 저장일 경우 프롬프트를 띄워 저장, 만약 취소 버튼 클릭시 노네임으로 저장
     * @returns 이미 한 번 저장한 데이터일 경우 저장 버튼 클릭 시 새 타이틀 작성 않고 바로 저장
     */
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
    
    /**
     * 기존에 저장된 타이틀을 다른 이름으로 저장
     * @returns 다른 이름으로 저장 시 해당 이름이 이미 있으면 저장 불가
     */
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

    /**
     * 저장 데이터들을 노트와 로컬스토리지에 기록
     * @param {*} saveTitle 
     * @param {*} text 
     */
    const onSaveLocalStorage = (saveTitle, text) => {
        setNotes(notes.map(note => note.selected ? {...note, title: saveTitle} : note))
        if(!saveData.includes(saveTitle)){
            setSaveData(saveData.concat(saveTitle))
        }
        localStorage.setItem(saveTitle, text);
        console.log("onSave!!!")
    }
    
    /**
     * 모달 창 표시 / 비표시 하기 위한 함수
     */
    const onLoad = () => {
        setModalOn(!modalOn)
    }



    /**
     * onSave firebase 버전 이하 동일
     * @param {*} title 
     * @param {*} text 
     */
    const onSaveFS = (title, text) => {
        setNotes(notes.map(note => note.selected ? {...note, title: title} : note))
        if(!saveData.includes(title)){
            setSaveData(saveData.concat(title))
        }
        const titleF = storageRef.child('user/'+ uId + '/text/' + title);
        titleF.putString(text).then(function(snapshot){
            console.log("upload!!")
        })
        localStorage.setItem(title, text);
        console.log("onSave!!!")
    }

    const onSaveF = () => {
        if(!uId){
            alert("로그인이 필요한 서비스입니다. 로그인해주세요.")
            return
        }
        if(!notes.find(note => note.selected)){
            alert("활성화된 노트가 없습니다.")
            return
        }
        let title = notes.find(note => note.selected).title
        let text = notes.find(note => note.selected).text
        if(saveData.includes(title)){
            onSaveFS(title, text)
            return;
        }
        let saveTitle = prompt("저장할 타이틀을 정해주세요.")
        if(!saveTitle) saveTitle = "noName";
        onSaveFS(saveTitle, text);
    }

    const onSaveAsF = () => {
        if(!uId){
            alert("로그인이 필요한 서비스입니다. 로그인해주세요.")
            return
        }
        if(!notes.find(note => note.selected)){
            alert("활성화된 노트가 없습니다.")
            return
        }
        const currentTitle = notes.find(note => note.selected).title;
        let saveAsTitle = prompt("다시 저장할 타이틀을 정해주세요.")
        if(!saveAsTitle) return;
        if(saveAsTitle === currentTitle){
            alert("기존에 등록한 타이틀입니다.")
            return;
        }
        let text = notes.find(note => note.selected).text
        onSaveFS(saveAsTitle, text);
        setSaveData(saveData => saveData.filter(save => save !== currentTitle))
        console.log(saveData)
        localStorage.removeItem(currentTitle)
    }

    return(
        <div className = "menu">
            <button className = "saveBtn" onClick={() => onSaveF()}>SAVE</button>
            <button className = "loadBtn" onClick={() => onLoad()}>LOAD</button>
            <button className = "saveAsBtn" onClick={() => onSaveAsF()}>SAVEAS</button>            
            <button className = "tabBtn" onClick={() => onNewTab()}>TAB</button>
        {modalOn && (
            <LoadList notes = {notes} setNotes = {setNotes} saveData = {saveData} nextId = {nextId} onLoad = {onLoad}>
            </LoadList>
        )}
        </div>
    )
}

export default MenuList;