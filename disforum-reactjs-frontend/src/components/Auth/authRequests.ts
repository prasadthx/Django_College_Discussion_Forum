import axios from "axios";

const dbUrl = process.env.REACT_APP_DB_URL

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${dbUrl}/register/login`,
            headers: { 'content-type': 'application/json' },
            data: {
                "username": username,
                "password": password
            }
        })
        return {status:response.status, response:response.data};
    }
    catch (error) {
        return {status:"failure", response:error};
    }
}

export const registerNewUser = async (rollNo: string, email: string, password: string, password2: string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${dbUrl}/register/new_user`,
            headers: { 'content-type': 'application/json' },
            data: {
                "roll_no": rollNo,
                "email":email,
                "password": password,
                "password2": password2,
                "login_count":2
            }
        })
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const getUser = async (rollNo: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/register/student_info/${rollNo}`,
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const getEnrolledClasses = async (token: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/register/userclasses`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const getAllClasses = async (token: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/register/classes`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const getClassDetails = async (token: string, classId: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/register/class/${classId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const enrollInClass = async (class_associated: number, token: string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${dbUrl}/register/userclasses`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "class_associated" : class_associated
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const unenrollInClass = async (classDataId: string, token: string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${dbUrl}/register/classdata/${classDataId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const getQuestions = async (token: string, classId:string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/question/question/${classId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const getSingleQuestion = async (questionId:string, token: string, classId:string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/question/question/${classId}/${questionId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const getAnswers = async (token: string, classId:string, questionId:string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/question/answer/${classId}/${questionId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const createQuestion = async (questionText : String, token : String, classId : String) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${dbUrl}/question/question/${classId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "question_text" : questionText
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const editQuestion = async (questionText : String, token : String, classId : String, questionId:string) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${dbUrl}/question/question/${classId}/${questionId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "question_text": questionText
            }
        })
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export const deleteQuestion = async (token : String, classId : String, questionId:string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${dbUrl}/question/question/${classId}/${questionId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    } catch (error) {
        alert(error);
    }
}

export const createAnswer = async (token: string, classId:string, questionId:string, answerText:string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${dbUrl}/question/answer/${classId}/${questionId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "answer_text" : answerText
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const editAnswer = async (token: string, classId:string, questionId:string, answerId:string, answerText:string) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${dbUrl}/question/answer/${classId}/${questionId}/${answerId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "answer_text" : answerText
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const deleteAnswer = async (token: string, classId:string, questionId:string, answerId:string) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${dbUrl}/question/answer/${classId}/${questionId}/${answerId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const addClass = async (student:String, token: String, className:String) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${dbUrl}/register/classes`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "class_associated" : className,
                "students" : [student]
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const editClass = async (token: String, className:String , classId : String) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${dbUrl}/register/class/${classId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "class_associated" : className,
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const deleteClass = async (token: String, classId : String) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${dbUrl}/register/class/${classId}`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const forgotPassword = async (rollNo: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${dbUrl}/register/forgot_password/${rollNo}`,
            headers: {
                'content-type': 'application/json',
            },
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const resetPassword = async (password : string, password2 : string, token:string) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${dbUrl}/register/password_reset`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "password": password,
                "password2": password2
            }
        })
        return response.data;
    }
    catch (error) {
        alert(error);
    }
}

export const updateStudentEmail = async (token: String, email: String) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${dbUrl}/register/student_mod`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: {
                "email" : email
            }
        })
        return {status:response.status, response:response.data};
    }
    catch (error) {
        return {status:"failure", response:error};
    }
}

export const deleteStudent = async (token: String) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${dbUrl}/register/student_mod`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${token}`
            },
        })
        return {status:response.status, response:response.data};
    }
    catch (error) {
        return {status:"failure", response:error};
    }
}
