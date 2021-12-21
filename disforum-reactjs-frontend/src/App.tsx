import './App.css';
import Auth from './components/Auth/Auth';
import {Navigate, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import Register from "./components/Auth/Register/Register";
import {Route} from "react-router";
import React from "react";
import Login from "./components/Auth/Login/Login";
import {AuthProvider} from "./components/Auth/AuthContext";
import {ProtectedRoute, RedirectRoute} from "./components/Auth/ValidateRoute";
import Classes from './components/MainPage/Classes/Classes';
import PathNotFound from "./components/MainPage/PathNotFound";
import QuestionsView from "./components/MainPage/Questions/QuestionsView";
import AddQuestion from "./components/MainPage/Questions/AddQuestion";
import AddClass from "./components/MainPage/Classes/AddClass";
import AnswersView from "./components/MainPage/Answers/AnswersView";
import AddAnswers from "./components/MainPage/Answers/AddAnswers";
import EditAnswer from "./components/MainPage/Answers/EditAnswer";
import EditClass from "./components/MainPage/Classes/EditClass";
import ClassDetail from "./components/MainPage/Classes/ClassDetail";
import EditQuestion from "./components/MainPage/Questions/EditQuestion";
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import ForgotPassword from "./components/Auth/ForgotPassword";
import PasswordReset from "./components/Auth/PasswordReset";
import Settings from "./components/Auth/Settings";

function App() {
    let user = localStorage.getItem("user");
    user = JSON.parse(user as string);
    return (
        <div className="App max-h-screen">
            <ReactNotification/>
            <AuthProvider userData={user}>
                <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute><MainPage /></ProtectedRoute>}>
                        <Route path="/dashboard" element={<ProtectedRoute><Classes/></ProtectedRoute>}/>
                        <Route path="/dashboard/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
                        <Route path="/dashboard/addClass" element={<ProtectedRoute><AddClass/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/:classId" element={<ProtectedRoute><QuestionsView/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/:classId/details" element={<ProtectedRoute><ClassDetail/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/:classId/edit" element={<ProtectedRoute><EditClass/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/addQuestion" element={<ProtectedRoute><AddQuestion/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/:classId/:questionId" element={<ProtectedRoute><AnswersView/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/:classId/:questionId/edit" element={<ProtectedRoute><EditQuestion/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/:classId/:questionId/addAnswer" element={<ProtectedRoute><AddAnswers/></ProtectedRoute>}/>
                        <Route path="/dashboard/classes/:classId/:questionId/:answerId/edit" element={<ProtectedRoute><EditAnswer/></ProtectedRoute>}/>
                    </Route>
                    <Route path="/auth" element={<RedirectRoute><Auth/></RedirectRoute>}>
                        <Route path="login" element={<RedirectRoute><Login/></RedirectRoute>} />
                        <Route path="register" element={<RedirectRoute><Register/></RedirectRoute>} />
                        <Route path="forgotPassword" element={<RedirectRoute><ForgotPassword/></RedirectRoute>} />
                        <Route path="resetPassword/" element={<RedirectRoute><PasswordReset/></RedirectRoute>} />
                    </Route>
                    <Route path="/" element={<Navigate to={"/dashboard"} replace />}/>
                    <Route path="*" element={<PathNotFound/>}/>
                </Routes>
            </AuthProvider>
        </div>
  );
}

export default App;
