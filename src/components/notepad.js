import '../style/Notepad.css'

const Notepad = ({children}) => {

    return(
        <div className = "container">
            <div className = "title">TxT Editor</div>
            <div className = "content">{children}</div>
        </div>
    )
}

export default Notepad;