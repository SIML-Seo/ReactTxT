import "../style/LoadList.css"
import { load, titleList } from "../firebase.js"
import { onSnapshot } from "firebase/firestore"

const LoadList = ({notes, setNotes, nextId, saveData, onLoad}) => {

    /**
     * JSX로 for문 적을 수 없기에 생성한 컴포넌트 
     * 저장한 데이터 없을 시 표시, 있을 시 개수만큼 모달창에 목록 표시
     * @returns 
     */
    const content = () => {
        const result = [];
        if(saveData.length === 0) result.push(<li>아직 저장된 데이터가 없습니다.</li>)
        for(let i = 0; i < saveData.length; i++){
            console.log(saveData[i])
            result.push(<li onClick = {() => loadTab(saveData[i])}>{saveData[i]}</li>)
        }
        return result;
    }

    /**
     * 띄워진 로드창에서 해당 라인 클릭 시 기존의 노트 ID를 참고하여 새 ID 작성 후,
     * 다른 Tab을 비활성화 하고 Tab 새로 추가(불러오기)
     * @param {*} title 
     */
    const loadTab = (title) => {
        const text = localStorage.getItem(title);
        const loadNote = {
            id : nextId.current,
            title : title,
            text : text,
            selected : true
        }
        nextId.current += 1;
        const newNotes = notes.map(note => ({...note, selected: false}))
        setNotes(() => newNotes.concat(loadNote));
        console.log("loadTab!!!")
    }



    const loadF = (title) => {
        const text = JSON.parse(load(title)).text;

        const loadNote = {
            id : nextId.current,
            title : title,
            text : text,
            selected : true
        }
        nextId.current += 1;
        const newNotes = notes.map(note => ({...note, selected: false}))
        setNotes(() => newNotes.concat(loadNote));
        console.log("loadTab!!!")
    }

    const contentF = () => {
        const result = [];
        const saveList = titleList();
        console.log(saveList)

        if(saveList.length === 0) result.push(<li>아직 저장된 데이터가 없습니다.</li>)
        onSnapshot(saveList, snaps => {
            snaps.forEach(note => {
                result.push(<li onClick = {() => loadF(note.data().title)}>{note.data().title}</li>)
            })
        })
        // for(let i = 0; i < saveList.length; i++){
        //     console.log(saveList[i])
        //     result.push(<li onClick = {() => loadF(saveList[i])}>{saveList[i]}</li>)
        // }
        return result;
    }


    return(
        <div className = "loadContainer" onClick = {onLoad}>
            <div className = "modalContainer" onClick={(e) => e.stopPropagation}>
                <div className= "container">
                    <div className = "title">Load List</div>
                    <div className = "content">
                        {contentF()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadList;