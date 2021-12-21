import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {trackPromise} from "react-promise-tracker";
import {getQuestions} from "../../Auth/authRequests";
import {useAuth} from "../../Auth/AuthContext";
import {LoadingIndicator} from "../LoadingIndicator";
import {BsInfoCircleFill, IoAddCircle, IoArrowBackCircle} from "react-icons/all";
import renderQuestions from "./RenderQuestions";
import CustomScrollBar from "../NavComponent/CustomScrollbar";

const QuestionsView = (props: any) => {
    const navigate = useNavigate();
    const {classId} = useParams();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        trackPromise(
            getQuestions(user.token, classId as string).then(
                (response) => {
                    setQuestions(response);
                    setLoading(false);
                }
            ))
    }, [])

    return (
        <div className={"w-full flex items-center justify-center text-white max-h-full py-5"} style={{height:"93vh"}}>
            <div className={"h-full w-1/5 flex flex-col items-center justify-around text-5xl text-gray-600"}>
                <div><IoArrowBackCircle className={"hover:text-white cursor-pointer"} onClick={() => navigate(-1)}/></div>
                <div><IoAddCircle className={"hover:text-white cursor-pointer"} onClick={() => navigate("/dashboard/classes/addQuestion", {state:classId as string})}/></div>
            </div>
            <div className={"h-full w-3/5 flex flex-col items-center"}>
                <CustomScrollBar>
                    {/*@ts-ignore*/}
                {loading ?  <LoadingIndicator /> : renderQuestions(questions, classId)}
                </CustomScrollBar>
            </div>
            <div className={"h-full w-1/5 flex items-center justify-center text-white text-5xl text-gray-600"}>
                <div><BsInfoCircleFill className={"hover:text-white cursor-pointer"} onClick={() => navigate(`/dashboard/classes/${classId}/details`)}/></div>
            </div>
        </div>
    )
}

export default QuestionsView;


