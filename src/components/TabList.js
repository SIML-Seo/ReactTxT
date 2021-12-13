import "../style/TabList.css"

const TabList = () => {
    return(
        <div>
            <div className = "tabLi">
                <li>A</li>
                <li>B</li>
                <li>C</li>
            </div>
            <div className = "tabContainer">
                <textarea>가나다라마바사</textarea>
            </div>
        </div>
    )
}

export default TabList