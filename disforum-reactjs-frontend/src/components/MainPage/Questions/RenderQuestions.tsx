import React from "react";
import {Link} from "react-router-dom";

interface DisplayQuestionProps {
    questionText : String,
    askedBy : String,
    createdAt : String,
    questionId : String,
    classId:String
}

const DisplayQuestion = (props:DisplayQuestionProps) => {
    return (
        <Link to={`/dashboard/classes/${props.classId}/${props.questionId}`} className={"w-full"}>
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
        </Link>
    )
}

const renderQuestions = (data:any, classId:any) => {
    if (data.length != 0) {
        return data.map((data: any, index:number) => {
            return (
                <DisplayQuestion
                    questionText={data.question_text}
                    askedBy={data.asked_by}
                    createdAt={data.created_at}
                    questionId={data.id}
                    classId={classId}
                    key={index}/>
            )
        })
    }
    else{
        return (
            <div className="text-white">
                No Questions asked.
            </div>
    )
    }
}

export default renderQuestions;
