import React, {useEffect, useState} from 'react';
import {getAllClasses, getEnrolledClasses} from "../../Auth/authRequests";
import {useAuth} from "../../Auth/AuthContext";
import {trackPromise} from "react-promise-tracker";
import {LoadingIndicator} from "../LoadingIndicator";
import renderClassList from "./RenderClasses";
import Autocomplete from "../NavComponent/AutoComplete";
import {useNavigate} from "react-router-dom";
import CustomScrollBar from "../NavComponent/CustomScrollbar";

const Classes = () => {
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [allClasses, setAllClasses] = useState(null);
    const [loading, setLoading] = useState(true);
    let { user } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        trackPromise(
        getEnrolledClasses(user.token).then(
            (response) => {
                setEnrolledClasses(response);
                getAllClasses(user.token).then(
                    (response) => {
                        setAllClasses(response);
                        setLoading(false);
                    }
                )
            }
        ))
    },[])


    // @ts-ignore
    // @ts-ignore
    return (
        <div className={"h-full w-full flex flex-col justify-center items-center text-white px-4"}>
            <div className={"h-1/6 flex justify-center items-center w-full border-gray-500 border-b-2"}>
                <div className={"flex"}>
                    {/*@ts-ignore*/}
                    {loading ? <LoadingIndicator/> : (
                        <div className={"flex w-full h-full"}>
                        <div className={"mr-3 relative"}>
                            Search Classes :
                        </div>
                        <div className={"text-black relative"}>
                        <Autocomplete suggestions={allClasses} navigator={navigate}/>
                        </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={"h-5/6 w-full flex items-center justify-center my-3"}>
                    <CustomScrollBar>
                    {/*@ts-ignore*/}
                    {loading ?  <LoadingIndicator /> : renderClassList(enrolledClasses)}
                    </CustomScrollBar>
            </div>
        </div>
    )
}

export default Classes;


