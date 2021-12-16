import "../style/LoadList.css"

const LoadList = ({notes, setNotes, nextId, saveData, onLoad}) => {

    const content = () => {
        const result = [];
        if(saveData.length === 0) result.push(<li>아직 저장된 데이터가 없습니다.</li>)
        for(let i = 0; i < saveData.length; i++){
            console.log(saveData[i])
            result.push(<li onClick = {() => loadTab(saveData[i])}>{saveData[i]}</li>)
        }
        return result;
    }

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

    return(
        <div className = "loadContainer" onClick = {onLoad}>
            <div className = "modalContainer" onClick={(e) => e.stopPropagation}>
                <div className= "container">
                    <div className = "title">Load List</div>
                    <div className = "content">
                        {content()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadList;