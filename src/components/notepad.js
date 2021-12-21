import '../style/Notepad.css'

/** 최상단 */
const Notepad = ({children}) => {

    return(
        <div className = "container">
            <div className = "title">TxT Editor</div>
            <div className = "content">{children}</div>
        </div>
    )
}

export default Notepad;