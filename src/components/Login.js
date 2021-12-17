import { signInGoogle, signOutGoogle, auth } from '../firebase.js'
import { getAuth, EmailAuthProvider, signOut, onAuthStateChanged} from 'firebase/auth';
import "../style/Login.css";

const Login = () => {
    let userL = ""
    onAuthStateChanged(auth, user => {
        if(user !== null){
            userL = user;
            console.log(userL)
        }
        if(user === null){
            console.log("LOGOUT")
        }
    });

    return(
        <div className="login">
            {(userL === "") ? 
                <button onClick={signInGoogle}>로그인</button> :
                <button onClick={signOutGoogle}>로그아웃</button>
            }
            {userL}
            <button onClick={signOutGoogle}>로그아웃</button>
        </div>
    )
}

export default Login;