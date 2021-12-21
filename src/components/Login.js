import { signInGoogle, signOutGoogle, auth } from '../firebase.js'
import { useState } from 'react';
import "../style/Login.css";

const Login = () => {
    const [user, setUser] = useState([""]);

    /**
     * 로그인 상태 확인
     */
    auth.onAuthStateChanged(loginned => {
        if(user !== null){
            setUser(loginned)
        }
        if(user === null){
            console.log("LOGOUT")
        }
    });

    return(
        <div className="login">
            {(user === null) ? 
                <button onClick={signInGoogle}>로그인</button> :
                <button onClick={signOutGoogle}>로그아웃</button>
            }
        </div>
    )
}

export default Login;