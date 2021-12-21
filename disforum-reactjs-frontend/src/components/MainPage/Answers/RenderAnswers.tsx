import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../Auth/AuthContext";
import CustomScrollBar from "../NavComponent/CustomScrollbar";

interface DisplayAnswersProps {
    answerId : String,
    answerText : String,
    repliedBy : String,
    answeredAt : String,
}

const DisplayAnswers = (props:DisplayAnswersProps) => {
    const {user} = useAuth();
    const navigate = useNavigate()
    const {classId} = useParams();
    const {questionId} = useParams();

    return (
            <div className={"flex flex-col items-center text-white border-gray-400 border-2 rounded-md p-3 w-full mb-7 cursor-pointer"}
                 onClick={() => {if(props.repliedBy == user.rollNo){navigate(`/dashboard/classes/${classId}/${questionId}/${props.answerId}/edit`);}}} >
                <div className={"w-full flex flex-col"}>
                    <div className={"bg-red-400 text-black font-bold rounded-t-md"}>
                        Answer
                    </div>
                    <div className={"border-b-2 rounded-md border-gray-700"}>
                        {props.answerText}
                    </div>
                </div>
                <div className={"w-full flex flex-col mt-4"}>
                    <div className={"bg-yellow-400 text-black font-bold rounded-t-md"}>
                        Replied By
                    </div>
                    <div className={"border-b-2 rounded-md border-gray-700"}>
                        {props.repliedBy}
                    </div>
                </div>
                <div className={"w-full flex flex-col mt-4"}>
                    <div className={"bg-blue-600 text-black font-bold rounded-t-md"}>
                        Replied At
                    </div>
                    <div className={"border-b-2 rounded-md border-gray-700"}>
                        {props.answeredAt}
                    </div>
                </div>
            </div>
    )
}

const DisplayQuestion = (props:any) => {
    return (
        <div className={"flex flex-col items-center text-white border-gray-400 border-2 rounded-md p-3 w-full mb-7"}>
            <div className={"w-full flex flex-col"}>
                <div className={"bg-red-400 text-black font-bold rounded-t-md"}>
                    Question
                </div>
                <div className={"border-b-2 rounded-md border-gray-700"}>
                    {props.questionText}
                </div>
            </div>
            <div className={"w-full flex flex-col mt-4"}>
                <div className={"bg-yellow-400 text-black font-bold rounded-t-md"}>
                    Asked By
                </div>
                <div className={"border-b-2 rounded-md border-gray-700"}>
                    {props.askedBy}
                </div>
            </div>
            <div className={"w-full flex flex-col mt-4"}>
                <div className={"bg-blue-600 text-black font-bold rounded-t-md"}>
                    Created At
                </div>
                <div className={"border-b-2 rounded-md border-gray-700"}>
                    {props.createdAt}
                </div>
            </div>
        </div>
    )
}

const renderAnswers = (data:any, questionData:any, classId:any) => {
    return (
        <div className={"w-full h-full flex flex-col"}>
            <div style={{flex:"0.3"}}>
                <DisplayQuestion questionText={questionData.question_text} askedBy={questionData.asked_by} createdAt={questionData.created_at}/>
            </div>
            <hr className={"mb-3 border-gray-500"}/>
            <div style={{flex:"0.7"}} className={"flex flex-col h-full overflow-y-auto"}>
                <CustomScrollBar>
                {
                    (data.length != 0) ?
                        (
                            data.map((data: any, index:number) => {
                                return (
                                    <DisplayAnswers
                                        answerId= {data.id}
                                        answerText={data.answer_text}
                                        repliedBy={data.replied_by}
                                        answeredAt={data.answered_at}
                                        key={index}/>
                                )
                            })
                        ) : (
                            <div className="text-white">
                                No Answers present.
                            </div>
                    )
                }
                </CustomScrollBar>
            </div>
        </div>
    )
}

export default renderAnswers;
