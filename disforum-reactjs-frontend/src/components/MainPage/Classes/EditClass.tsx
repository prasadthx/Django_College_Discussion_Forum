import {IoIosCloseCircle} from "react-icons/all";
import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useState} from "react";
import {editClass} from "../../Auth/authRequests";
import {useAuth} from "../../Auth/AuthContext";

const EditClass = (props:any) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const {classId} = useParams();
    const [className, setClassName] = useState("");

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(className.length != 0){
            editClass(user.token, className, classId as string).then(
                () => navigate(`/dashboard`)
            )
        }
        else{
            alert("Class Name is empty!");
        }
    }

    return(
        <div className={"h-full w-full flex justify-center items-center"}>
            <div className={"w-1/2 flex flex-col rounded-md projectModal "}>
                <div className={"bg-green-500 flex items-center rounded-t-md"}>
                    <div className={"w-1/3 pl-2 text-3xl text-red-800 cursor-pointer"}>
                        <IoIosCloseCircle className={"hover:text-red-600"} onClick={()=>navigate(-1)}/>
                    </div>
                    <div className={"w-1/3 text-bold text-white"}><h1>Edit Class</h1></div>
                    <div className={"w-1/3"}></div>
                </div>
                <div className={"w-full"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"w-full h-full"}>
                            <div className={"w-full mt-5"}>
                                <input type={"text"} className={"w-11/12 h-full resize-none bg-gray-800 p-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent"}
                                       placeholder={"Enter Class Name"} onChange={(event => {setClassName(event.target.value)})}/>
                            </div>
                            <div className={"w-full"}>
                                <input type="submit" value="Edit Class"
                                       className={"p-1 px-2 rounded-md bg-green-500 btn btn-primary m-3 text-white cursor-pointer hover:bg-green-400"} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditClass;
