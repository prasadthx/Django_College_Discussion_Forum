import {IoIosCloseCircle} from "react-icons/all";
import {FormEvent, useEffect, useState} from "react";
import {notNull, validatePassword} from "./formValidators";
import {ValidationComponent} from "./ValidationComponent";
import {resetPassword} from "./authRequests";
import displayNotifications from "./FlashMessage";
import {useNavigate, useSearchParams} from "react-router-dom";

const PasswordReset = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [buttonActive, setButtonActive] = useState(false);
    const navigate = useNavigate();
    const token = searchParam.toString().split("=")[1];

    useEffect( () => {
        if (notNull(password).length === 0 && validatePassword(password, password2).length === 0){
            setButtonActive(true);
        }
        else{
            setButtonActive(false);
        }
    }, [password, password2])

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password.length != 0){
            resetPassword(password, password2, token).then(
                () => {
                    navigate(`/auth/login`);
                    displayNotifications("Password changed successfully", `Login with the new password to the account`, "success");
                }
            )
        }
        else{
            alert("Class Name is empty!");
        }
    }

    return(
        <div className={"h-full w-full flex justify-center items-center"}>
            <div className={" flex flex-col rounded-md projectModal "}>
                <div className={"bg-purple-800 flex items-center rounded-t-md"}>
                    <div className={"w-1/3 pl-2 text-3xl text-red-800 cursor-pointer"}>
                        <IoIosCloseCircle className={"hover:text-red-600"} onClick={()=>navigate(-1)}/>
                    </div>
                    <div className={"w-1/3 text-bold text-white"}><h1>Reset Password</h1></div>
                    <div className={"w-1/3"}></div>
                </div>
                <div className={"w-full"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"w-full h-full"}>
                            <div className={"w-full mt-5 px-7"}>
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
                            </div>
                            <div className={"w-full my-5"}>
                                {
                                    buttonActive ? (
                                        <input type="submit" value="Reset Password" disabled={false}
                                               className={ "btn btn-primary bg-purple-700 rounded-t-lg rounded-b-lg px-3 py-1 cursor-pointer" } />
                                    ) : (
                                        <input type="submit" value="Reset Password" disabled={true}
                                               className={ "btn btn-primary bg-purple-700 rounded-t-lg rounded-b-lg px-3 py-1 line-through cursor-not-allowed" } />
                                    )
                                }

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset;
