import '../style/MenuList.css'

const MenuList = ({onNewTab}) => {
    return(
        <div className = "menu">
            <button className = "saveBtn">SAVE</button>
            <button className = "loadBtn">LOAD</button>
            <button className = "saveAsBtn">SAVEAS</button>            
            <button className = "tabBtn" onClick={() => onNewTab()}>TAB</button>
        </div>
    )
}

export default MenuList;