import logo from "../../../group.png"
import {IoSettings, IoAddCircle, IoMdLogOut} from "react-icons/all";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../Auth/AuthContext";
import displayNotifications from "../../Auth/FlashMessage";


const NavComponent = () => {
    const {user} = useAuth();
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const rollNo = user.rollNo;

    const Logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/auth/login");
        displayNotifications("Successful Logout", `Roll No:${rollNo}, Logged Out from DisForum`, "success");
    }

    return (
        <div className={"w-full bg-purple-800 h-full text-white"}>
            <div className={"flex w-full h-full items-center"}>
                <div className={"rounded-full bg-red-400 ml-2"}>
                    <img src={logo} width={40} className={"p-1"}/>
                </div>
                <div className={"flex items-center ml-7"}>
                    <div className={"text-2xl font-bold cursor-pointer"} onClick={()=>navigate('/dashboard')}><h1>DisForum</h1></div>
                </div>
                <div className={"w-3/5"}>

                </div>
                <div className={"flex items-center"}>
                    <div>{user.rollNo}</div>
                </div>
                <div className={"flex items-center w-2/5"}>
                    <div className={"w-1/3"}>
                        <Link to={"/dashboard/addClass"}>
                            <button className={"bg-green-500 p-1 rounded-full px-2 inline-flex items-center justify-between"}>
                                Add Class <IoAddCircle className={"ml-1"}/>
                            </button>
                        </Link>
                    </div>
                    <div className={"w-1/3"}>
                        <Link to={"/dashboard/settings"}>
                            <button className={"bg-blue-500 p-1 rounded-full px-2 inline-flex items-center justify-between"}>
                                Settings <IoSettings className={"ml-1"}/>
                            </button>
                        </Link>
                    </div>
                    <div className={"w-1/3"}>
                        <button className={"bg-red-500 p-1 rounded-full px-2 inline-flex items-center justify-between"}
                                onClick={Logout}>
                            Logout  <IoMdLogOut className={"ml-1"}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavComponent;
