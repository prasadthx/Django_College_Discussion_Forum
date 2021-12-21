import '../Questions/QuestionModal.css'
import {IoIosCloseCircle} from "react-icons/all";
import {FormEvent, useState} from "react";
import {createAnswer} from "../../Auth/authRequests";
import {useAuth} from "../../Auth/AuthContext";
import {useNavigate, useParams} from "react-router-dom";

const AddAnswer = (props:any) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const {classId} = useParams();
    const {questionId} = useParams();
    const [answerText, setAnswerText] = useState("");

    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(answerText.length != 0){
            createAnswer(user.token, classId as string, questionId as string, answerText).then(
                () => navigate(-1)
            )
        }
        else{
            alert("Answer is empty!");
        }
    }

    return(
        <div className={"h-full w-full flex justify-center items-center"}>
            <div className={"h-1/2 w-1/2 flex flex-col rounded-md projectModal"}>
                <div className={"h-1/8 bg-purple-800 flex items-center rounded-t-md"}>
                    <div className={"w-1/3 pl-2 text-3xl text-red-800 cursor-pointer"}>
                        <IoIosCloseCircle className={"hover:text-red-600"} onClick={()=>navigate(-1)}/>
                    </div>
                    <div className={"w-1/3 text-bold text-white"}><h1>Add Answer</h1></div>
                    <div className={"w-1/3"}></div>
                </div>
                <div className={"h-7/8 w-full"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"w-full h-full"}>
                            <div className={"w-full h-5/6 mt-5"}>
                                <textarea className={"w-11/12 h-full resize-none bg-gray-800 p-3 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-transparent"}
                                          rows={9} cols={30} placeholder={"Enter your Answer"} onChange={(event => {setAnswerText(event.target.value)})}/>
                            </div>
                            <div className={"w-full h-1/6"}>
                                <input type="submit" value="Add Answer"
                                       className={"p-1 px-2 rounded-md bg-purple-800 btn btn-primary m-3 text-white cursor-pointer hover:bg-purple-600"} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAnswer;
