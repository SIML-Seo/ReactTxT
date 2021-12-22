import "../style/LoadList.css"
import { storageRef, auth } from "../firebase";
import { useEffect, useState } from "react";
import axios from "axios";

const LoadList = ({notes, setNotes, nextId, saveData, onLoad}) => {
    const [listF, setListF] = useState([]);

    const uId = (!auth.currentUser) ? "" : auth.currentUser.uid;

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
        console.log(result)
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



    /**
     * URL을 통한 다운로드는 구글클라우드 별도 설치 후 CORS 가능토록 스토리지 버킷을 구성을 바꿔야함(아니면 거부됨)
     * https://firebase.google.com/docs/storage/web/download-files#download_data_via_url
     * @param {}} title 
     */
    const loadFireBase = async (title) => {
        let text;
        const textF = storageRef.child('user/' + uId + '/text/' + title)
        await textF.getDownloadURL().then(async (url) => {
            await axios.get(url, {responseType: 'blob'}).then(async (res) => {
                await res.data.text().then(async (textB) => {
                    text = textB;
                })
            })
        })
        return text;
    }

    const loadF = async (title) => {
        const text = await loadFireBase(title);
        const loadNote = {
            id : nextId.current,
            title : title,
            text : text,
            selected : true
        }
        nextId.current += 1;
        const newNotes = notes.map(note => ({...note, selected: false}))
        setNotes(() => newNotes.concat(loadNote));
        localStorage.setItem(title, text);
        console.log("loadTab!!!")
    }

    useEffect(() => {
        listFireBase();
    }, [])

    /**
     * firebase에서 해당하는 storage에 있는 파일들을 나열하여 List에 세팅
     */
    const listFireBase = () => {
        if(!uId){
            alert("로그인이 필요한 서비스입니다. 로그인해주세요.")
            return
        }
        const textF = storageRef.child('user/' + uId + '/text/');
        textF.listAll().then((res) => {
            res.items.forEach((itemRef) => {
                setListF((arr) => [...arr, itemRef.name])
            })
        })
    }

    const contentF = () => {
        const result = [];
        if(listF.length === 0) result.push(<li>아직 저장된 데이터가 없습니다.</li>)
        for(let i = 0; i < listF.length; i++){
            result.push(<li onClick = {() => loadF(listF[i])}>{listF[i]}</li>)
        }
        console.log();
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