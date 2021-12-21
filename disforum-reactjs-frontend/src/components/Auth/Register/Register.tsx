import {FormEvent, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getUser, registerNewUser} from '../authRequests'
import {notNull, validateEmail, validatePassword} from "../formValidators";
import {ValidationComponent} from "../ValidationComponent";
import User from "../../Models/User";
import displayNotifications from "../FlashMessage";
import {useAuth} from "../AuthContext";

const Register = () => {
    const [rollNo, setRoll] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [buttonActive, setButtonActive] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();
    let {setUser} = useAuth();
    let from = location.state?.from?.pathname || "/dashboard";

    useEffect( () => {
        if (notNull(rollNo).length === 0 && notNull(password).length === 0 &&
            validateEmail(email).length === 0 && validatePassword(password, password2).length === 0){
            setButtonActive(true);
        }
        else{
            setButtonActive(false);
        }
    }, [rollNo, email, password, password2])

    const RegisterNewUser = (event:FormEvent<HTMLFormElement>, rollNo : string, email: string, password : string, password2 : string) => {
        event.preventDefault();
        registerNewUser(rollNo, email, password, password2).then(
            (response: any) => {
                const user = new User();
                user.token = response.token;
                getUser(rollNo).then(
                    (response) => {
                        user.id = response["Id"];
                        user.rollNo = rollNo.toString();
                        user.email = response["Email"];
                        user.firstName = response["First Name"];
                        user.lastName = response["Last Name"];
                        localStorage.setItem("user", user.getString());
                        setUser(user);
                        navigate(from, { replace: true });
                        displayNotifications("Successful Registration", `Roll No:${rollNo}, Logged In To DisForum`, "success");
                    }
                )
            }
        );
    }

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-700 p-10 rounded-t-2xl rounded-b-2xl">
            <div>
                <form onSubmit={(e) => RegisterNewUser(e, rollNo, email, password, password2)}>
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between">
                            <div><h2>Roll No </h2></div>
                            <div>
                                <div><input type="text" value= {rollNo} onChange={(e) => setRoll(e.target.value)} className={"text-black rounded-md pl-3"}/></div>
                                <div><ValidationComponent result={notNull(rollNo)} /></div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-7">
                            <div className={"mr-9"}><h2>Email</h2></div>
                            <div>
                                <div><input type="text" value= {email} onChange={(e) => setEmail(e.target.value)} className={"text-black rounded-md pl-3"}/></div>
                                <div><ValidationComponent result={notNull(email).length != 0 ? notNull(email) : validateEmail(email)} /></div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-7">
                            <div className={"mr-9"}><h2>Password</h2></div>
                            <div>
                                <div><input type="password" value= {password} onChange={(e) => setPassword(e.target.value)} className={"text-black rounded-md pl-3"}/></div>
                                <div><ValidationComponent result={notNull(password)} /></div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-7">
                            <div className={"mr-9"}><h2>Confirm Password</h2></div>
                            <div>
                                <div><input type="password" value= {password2} onChange={(e) => setPassword2(e.target.value)} className={"text-black rounded-md pl-3"}/></div>
                                <div><small><ValidationComponent result={validatePassword(password, password2)} /></small></div>
                            </div>
                        </div>
                        <hr className={"mt-12"}/>
                        <div className={"mt-5"}>
                            {
                                buttonActive ? (
                                    <input type="submit" value="Register" disabled={false}
                                           className={ "btn btn-primary bg-purple-700 rounded-t-lg rounded-b-lg px-3 py-1 cursor-pointer" } />
                                ) : (
                                    <input type="submit" value="Register" disabled={true}
                                           className={ "btn btn-primary bg-purple-700 rounded-t-lg rounded-b-lg px-3 py-1 line-through cursor-not-allowed" } />
                                )
                            }

                        </div>
                        <div className={"mt-4"}>
                            <Link to="/">
                                <button value="Login"
                                className={"btn btn-primary bg-green-700 rounded-t-lg rounded-b-lg px-3 py-1"}> Login </button>
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register;
