import {BsInfoCircleFill, IoAddCircle, IoArrowBackCircle} from "react-icons/all";
import {LoadingIndicator} from "../LoadingIndicator";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../Auth/AuthContext";
import {trackPromise} from "react-promise-tracker";
import {getAnswers, getSingleQuestion} from "../../Auth/authRequests";
import renderAnswers from "./RenderAnswers";

const AnswerView = (props:any) => {
    const navigate = useNavigate();
    const {classId} = useParams();
    const {questionId} = useParams();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [question, setQuestion] = useState(null);

    useEffect( () => {
        trackPromise(
            getSingleQuestion(questionId as string, user.token, classId as string).then(
                (response) => {
                    setQuestion(response);
                    getAnswers(user.token, classId as string, questionId as string).then(
                        (response) => {
                            setAnswers(response);
                            setLoading(false);
                        })
                }
            ))
    }, [])

    return (
        <div className={"w-full flex items-center justify-center text-white max-h-full py-5"} style={{height:"93vh"}}>
            <div className={"h-full w-1/5 flex flex-col items-center justify-around text-5xl text-gray-600"}>
                <div><IoArrowBackCircle className={"hover:text-white cursor-pointer"} onClick={() => navigate(-1)}/></div>
                <div><IoAddCircle className={"hover:text-white cursor-pointer"} onClick={() => navigate(`/dashboard/classes/${classId}/${questionId}/addAnswer`, {state:classId as string})}/></div>
            </div>
            <div className={"h-full w-3/5 flex flex-col items-center px-1"}>
                {/*@ts-ignore*/}
                {loading ?  <LoadingIndicator /> : renderAnswers(answers, question, classId)}
            </div>
            <div className={"h-full w-1/5 flex items-center justify-center text-white text-5xl text-gray-600"}>
                <div><BsInfoCircleFill className={"hover:text-white cursor-pointer"} onClick={() => navigate(`/dashboard/classes/${classId}/${questionId}/edit`)}/></div>
            </div>
        </div>
    )
}

export default AnswerView;
