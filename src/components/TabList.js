import "../style/TabList.css"

const TabList = ({notes , onDelete, onChangeText, onClickToTabLi}) => {
    let text = "";
    
    const onChange = (e) => {
        text = e.target.value;
        onChangeText(text);
    }

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