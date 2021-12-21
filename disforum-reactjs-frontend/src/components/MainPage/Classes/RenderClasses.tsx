import {Link} from "react-router-dom";
import React from "react";

interface CardProps {
    classAssociated : String,
    totalStudents : number,
    dataJoined : String,
    classId:number
}

const ClassCard = (props:CardProps) => {
    return (
        <Link to={`/dashboard/classes/${props.classId}`}>
            <div className={"flex w-60 rounded-md justify-center items-center bg-gray-500 p-3 my-3 mx-3"}>
                <div className={"w-full flex flex-col items-center"}>
                    <div className={"w-4/5 font-bold bg-black p-2 rounded-md"}>
                        <div className={"bg-yellow-400 text-black p-1 rounded-md"}>
                            Class Name
                        </div>
                        <div>
                            {props.classAssociated}
                        </div>
                    </div>
                    <div className={"w-4/5 mt-3 bg-black p-2 rounded-t-md"}>
                        <div className={"bg-purple-600 p-1 rounded-md"}>
                            Date Joined
                        </div>
                        <div>
                            {props.dataJoined}
                        </div>
                    </div>
                    <div className={"w-4/5 bg-black p-2 rounded-b-md"}>
                        <div className={"bg-purple-600 p-1 rounded-md"}>
                            Students
                        </div>
                        <div>
                            {props.totalStudents}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const renderClassList = (response:any) => {
    if (response.length != 0) {
        return response.map((data: any, index:number) => {
            return (
                <ClassCard
                    classAssociated={data.class_associated.class_associated}
                    totalStudents={data.class_associated.students.length}
                    dataJoined={data.date_joined}
                    classId={data.class_associated.id}
                    key={index}/>
            )
        })
    }
    else{
        return (
            <div>
                Not Enrolled in any class.
            </div>
        )
    }
}

export default renderClassList;
