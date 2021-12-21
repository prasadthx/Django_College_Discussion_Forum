import {IoIosCloseCircle} from "react-icons/all";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {trackPromise} from "react-promise-tracker";
import {
    deleteClass,
    enrollInClass,
    getClassDetails,
    getEnrolledClasses,
    unenrollInClass
} from "../../Auth/authRequests";
import {useAuth} from "../../Auth/AuthContext";
import {LoadingIndicator} from "../LoadingIndicator";
import {parseInt} from "lodash";

const ClassDetail = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const {classId} = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        trackPromise(
            getClassDetails(user.token, classId as string).then(
                (response) => {
                    console.log(response);
                    if (response !== null){
                        setClassInfo(response);
                        setLoading(false);
                    }
                }
            )
        )
    }, []);

    const DeleteClass = () => {
        deleteClass(user.token, classId as string).then(() => navigate(`/dashboard`))
    }

    const EnrollInClass = () => {
        enrollInClass(classId as unknown as number, user.token).then(
            () => {
                navigate('/dashboard', {replace:true});
            }
        )
    }

    const UnenrollInClass = () => {
        getEnrolledClasses(user.token).then(
            (response) => {
                let classDataId = "";
                for (let i = 0; i < response.length; i++) {
                    if (response[i].class_associated.id == classId) {
                        classDataId = response[i].id;
                        break;
                    }
                }
                unenrollInClass(classDataId as string, user.token).then(
                    () => {
                        navigate('/dashboard', {replace:true})
                    }
                )
            }
        )
    }

    return(
        <div className={"h-full w-full flex justify-center items-center"}>
            <div className={"h-1/2 w-1/2 flex flex-col rounded-md projectModal"}>
                <div className={"h-1/6 bg-purple-800 flex items-center rounded-t-md"}>
                    <div className={"w-1/3 pl-2 text-3xl text-red-800 cursor-pointer"}>
                        <IoIosCloseCircle className={"hover:text-red-600"} onClick={()=>navigate(-1)}/>
                    </div>
                    <div className={"w-1/3 text-bold text-white"}><h1>Class Details</h1></div>
                    <div className={"w-1/3 flex flex-col"}>
                    </div>
                </div>
                <div className={"h-5/6 flex flex-col"}>
                    {/*@ts-ignore*/}
                    {loading ?  <LoadingIndicator /> : (
                        <div className={"text-white h-full flex flex-col items-center justify-evenly"}>
                            <div className={"flex flex-col items-center justify-between border-gray-50 border-b-2 w-full rounded-b-md"}>
                                <div>Class Name</div>
                                {/*@ts-ignore*/}
                                <div>{classInfo.class_associated}</div>
                            </div>
                            <div className={"flex flex-col items-center justify-between border-gray-50 border-b-2 w-full rounded-b-md"}>
                                <div>Created At</div>
                                {/*@ts-ignore*/}
                                <div>{classInfo.created_at}</div>
                            </div>
                            <div className={"flex flex-col items-center justify-between border-gray-50 border-b-2 w-full rounded-b-md"}>
                                <div>Students</div>
                                {/*@ts-ignore*/}
                                <div>{classInfo.students.toString()}</div>
                            </div>
                            {/*@ts-ignore*/}
                            {classInfo.students[0] == user.rollNo ? (
                                <div className={"flex items-center justify-evenly"}>
                                    <div className={"mr-4"}>
                                        <button className={"bg-purple-600 p-2 rounded-md"}
                                                onClick={()=>navigate(`/dashboard/classes/${classId}/edit`)}>
                                            Edit
                                        </button>
                                    </div>
                                    <div>
                                        <button className={"bg-red-600 p-2 rounded-md"} onClick={DeleteClass}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                ) : (
                                // @ts-ignore
                                classInfo.students.includes(parseInt(user.rollNo)) ? (
                                        <div className={"flex items-center justify-evenly"}>
                                            <div>
                                                <button className={"bg-red-600 p-2 rounded-md"} onClick={()=>UnenrollInClass()}>
                                                    Unenroll
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={"flex items-center justify-evenly"}>
                                            <div>
                                                <button className={"bg-red-600 p-2 rounded-md"} onClick={(e)=>EnrollInClass()}>
                                                    Enroll
                                                </button>
                                            </div>
                                        </div>
                                    )
                            ) }
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ClassDetail;

