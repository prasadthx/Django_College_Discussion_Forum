import React, {FormEvent, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getUser, loginUser} from '../authRequests'
import {ValidationComponent} from "../ValidationComponent";
import {notNull} from "../formValidators";
import User from "../../Models/User";
import {useAuth} from "../AuthContext";
import displayNotifications from "../FlashMessage";


const Login = () => {
    const [rollNo, setRoll] = useState("");
    const [password, setPassword] = useState("");
    const [buttonActive, setButtonActive] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();
    let {setUser} = useAuth();
    let from = location.state?.from?.pathname || "/dashboard";

    useEffect( () => {
        if (notNull(rollNo).length === 0 && notNull(password).length === 0){
            setButtonActive(true);
        }
        else{
            setButtonActive(false);
        }
    }, [rollNo, password])


    const LoginVerify = (event:FormEvent<HTMLFormElement>, rollNo : string, password : string) => {
        event.preventDefault();
        loginUser(rollNo, password).then(
            (response: any) => {
                if (response.status != "failure"){
                    const user = new User();
                    user.token = response.response.token;
                    getUser(rollNo).then(
                        (response) => {
                            user.id = response["Id"];
                            user.rollNo = rollNo.toString();
                            user.email = response["Email"];
                            user.firstName = response["First Name"];
                            user.lastName = response["Last Name"];
                            localStorage.setItem("user", user.getString());
                            setUser(user);
                            navigate('/dashboard', { replace: true });
                            displayNotifications("Successful Login", `Roll No:${rollNo}, Logged In To DisForum`, "success");
                        }
                    )
                }
                else{
                    displayNotifications("Failed", `${response.response}`, "danger");
                }
            }
        );
    }

    return (
        <div className="w-full h-full flex justify-center items-center bg-gray-700 p-10 rounded-t-2xl rounded-b-2xl">
            <div>
                <form onSubmit={(e) => LoginVerify(e, rollNo, password)}>
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between">
                            <div><h2>Roll No </h2></div>
                            <div>
                                <div><input type="text" value= {rollNo} onChange={(e) => setRoll(e.target.value)} className={"text-black rounded-md pl-3"}/></div>
                                <div><ValidationComponent result={notNull(rollNo)} /></div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-7">
                            <div className={"mr-5"}><h2>Password</h2></div>
                            <div>
                                <div><input type="password" value= {password} onChange={(e) => setPassword(e.target.value)} className={"text-black rounded-md pl-3"}/></div>
                                <div><ValidationComponent result={notNull(password)} /></div>
                            </div>
                        </div>
                        <div className={"mt-7"}>
                            {
                                buttonActive ? (
                                    <input type="submit" value="Login"
                                           className={"btn btn-primary bg-purple-700 rounded-t-lg rounded-b-lg px-3 py-1 cursor-pointer"}/>
                                ) : (
                                    <input type="button" value="Login" disabled={true}
                                           className={"btn btn-primary bg-purple-700 rounded-t-lg rounded-b-lg px-3 py-1 line-through cursor-not-allowed"}/>
                                )
                            }
                        </div>
                        <div className={"mt-4"}>
                            <Link to="/auth/register">
                                <button value="Register"
                                className={"btn btn-primary bg-green-700 rounded-t-lg rounded-b-lg px-3 py-1"}> Register </button>
                            </Link>
                        </div>
                        <div className={"mt-3 text-right"}>
                            <Link to="/auth/forgotPassword">
                                <button value="Forgot Password"
                                        className={"text-sm"}> Forgot Password </button>
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;
