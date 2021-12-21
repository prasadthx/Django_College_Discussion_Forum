import React from "react";
import {BsEmojiFrownFill} from "react-icons/all";

const PathNotFound = (props: any) => {
    return (
        <div className={"text-white h-full w-full flex justify-center items-center"}>
            <div className={"flex w-1/5 items-center justify-evenly text-lg"}>
                <div>Path Not Found</div>
                <div><BsEmojiFrownFill/></div>
            </div>
        </div>
    )
}

export default PathNotFound;
