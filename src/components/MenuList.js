import '../style/MenuList.css'

const MenuList = () => {
    return(
        <div className = "menu">
            <button className = "saveBtn">SAVE</button>
            <button className = "loadBtn">LOAD</button>
            <button className = "saveAsBtn">SAVEAS</button>            
            <button className = "tabBtn">TAB</button>
        </div>
    )
}

export default MenuList;