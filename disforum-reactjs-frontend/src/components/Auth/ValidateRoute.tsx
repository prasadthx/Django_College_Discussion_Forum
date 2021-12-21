import {useAuth} from "./AuthContext";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import React from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    let { user } = useAuth();
    let location = useLocation();

    if (!user || !user.token || user.token === "") {
        return (
            <Navigate to="/auth/login" state={{ from: location }} />
        );
    }

    // let user through if they're logged in
    return children;
};

export const RedirectRoute = ({ children }: { children: JSX.Element }) => {
    let { user } = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/dashboard";

    if (!user || !user.token || user.token === "") {
        return (
            children
        );
    }

    return (
        <Navigate to={from} state={{ from: location }} />
    );
};


