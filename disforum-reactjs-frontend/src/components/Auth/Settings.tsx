import '../MainPage/Questions/QuestionModal.css'
import {IoIosCloseCircle} from "react-icons/all";
import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext";
import {deleteStudent, loginUser, resetPassword, updateStudentEmail} from "./authRequests";
import {ValidationComponent} from "./ValidationComponent";
import {notNull, validateEmail, validatePassword} from "./formValidators";
import displayNotifications from "./FlashMessage";
import User from "../Models/User";

const Settings = (props:any) => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [emailButtonActive, setEmailButtonActive] = useState(false)
    const [passwordButtonActive, setPasswordButtonActive] = useState(false);

    useEffect( () => {
        if (validateEmail(email).length === 0){
            setEmailButtonActive(true);
        }
        else{
            setEmailButtonActive(false);
        }
    }, [email])

    useEffect( () => {
        if (notNull(password).length === 0 && validatePassword(password, password2).length === 0){
            setPasswordButtonActive(true);
        }
        else{
            setPasswordButtonActive(false);
        }
    }, [password, password2])

    const updateEmail = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateStudentEmail(user.token, email).then(
            (response) => {
                if (response.status != "failure") {
                    navigate('/dashboard', {replace: true})
                }
                else {
                    console.log(response.response)
                    displayNotifications("Failure", `${response.response}`, "danger");
                }
            })
    }

    const passwordReset = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        resetPassword(password, password2, user.token).then(
            () => {
                const updatedUser = new User;
                updatedUser.id = user.id;
                updatedUser.firstName = user.firstName;
                updatedUser.lastName = user.lastName;
                updatedUser.email = user.email;
                updatedUser.rollNo = user.rollNo;
                loginUser(user.rollNo, password).then(
                    (response: any) => {
                        if (response.status != "failure") {
                            updatedUser.token = response.response.token;
                            setUser(updatedUser);
                            localStorage.setItem("user", updatedUser.getString());
                        }
                        navigate("/dashboard", {replace:true})
                        displayNotifications("Success", "Passwords updated successfully", "success");
                    }
                )
            }
        )
    }

    const deleteAccount = () => {
        deleteStudent(user.token).then(
            (response) => {
                if (response.status != "failure") {
                    setUser(null);
                    localStorage.removeItem("user");
                    navigate("/auth/login");
                    displayNotifications("Successful Deletion", `Account Deleted Successfully`, "success");
                }
            }
        )
    }

    return(
        <div className={"h-full w-full flex justify-center items-center"}>
            <div className={"w-1/2 flex flex-col rounded-md projectModal "}>
                <div className={"bg-green-500 flex items-center rounded-t-md"}>
                    <div className={"w-1/3 pl-2 text-3xl text-red-800 cursor-pointer"}>
                        <IoIosCloseCircle className={"hover:text-red-600"} onClick={()=>navigate(-1)}/>
                    </div>
                    <div className={"w-1/3 text-bold text-white"}><h1>Settings</h1></div>
                    <div className={"w-1/3"}></div>
                </div>
                <div className={"w-full"}>
                    <form onSubmit={updateEmail}>
                        <div className={"w-full h-full"}>
                            <div className={"w-full mt-5"}>
                                <div><input type={"text"} className={"w-11/12 h-full resize-none bg-gray-800 p-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"}
                                       placeholder={"Enter Email"} onChange={(event => {setEmail(event.target.value)})}/>
                                </div>
                                <div><ValidationComponent result={notNull(email).length != 0 ? notNull(email) : validateEmail(email)} /></div>
                            </div>
                            <div className={"w-full"}>
                                {emailButtonActive ? (
                                    <input type="submit" value="Update Email"
                                           className={"p-1 px-2 rounded-md bg-green-500 btn btn-primary m-3 text-white cursor-pointer hover:bg-green-400"} />
                                ) : (
                                    <input type="submit" value="Update Email" disabled={true}
                                           className={"p-1 px-2 rounded-md bg-green-500 btn btn-primary m-3 text-white cursor-pointer hover:bg-green-400 line-through"} />
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                <div className={"w-full"}>
                    <form onSubmit={passwordReset}>
                        <div className={"w-full h-full"}>
                            <div className={"w-full mt-5"}>
                                <div><input type={"password"} className={"w-11/12 h-full resize-none bg-gray-800 p-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"}
                                       placeholder={"Enter Password"} onChange={(event => {setPassword(event.target.value)})}/>
                                </div>
                                <div><ValidationComponent result={notNull(password)} /></div>
                            </div>
                            <div className={"w-full mt-5"}>
                                <div><input type={"password"} className={"w-11/12 h-full resize-none bg-gray-800 p-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"}
                                       placeholder={"Confirm Password"} onChange={(event => {setPassword2(event.target.value)})}/></div>
                                <div><small><ValidationComponent result={validatePassword(password, password2)} /></small></div>
                            </div>
                            <div className={"w-full"}>
                                {passwordButtonActive ? (
                                    <input type="submit" value="Update Password"
                                           className={"p-1 px-2 rounded-md bg-green-500 btn btn-primary m-3 text-white cursor-pointer hover:bg-green-400"} />
                                ) : (
                                    <input type="submit" value="Update Password" disabled={true}
                                           className={"p-1 px-2 rounded-md bg-green-500 btn btn-primary m-3 text-white cursor-pointer hover:bg-green-400 line-through"} />
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                <div className={"w-full"}>
                    <button className={"rounded-md bg-red-800 text-white p-1 m-2"} onClick={(e)=>deleteAccount()}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings;
