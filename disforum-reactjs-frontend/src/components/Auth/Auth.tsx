import React from 'react';
import {Outlet} from 'react-router';
import Typewriter from "typewriter-effect";

const Auth = () => {
    return (
        <div className="w-full h-full text-white flex flex-col justify-center items-center">
            <div className="text-4xl mb-20">
                <Typewriter
                    onInit={(typewriter)=> {
                        typewriter.typeString(`Welcome To <br> DisForum !`).start();
                    }}
                />
            </div>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}

export default Auth;
