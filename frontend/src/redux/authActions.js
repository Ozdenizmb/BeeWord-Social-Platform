import { login, signUp } from "../api/apiCalls";

export const logoutSuccess = () => {
    return {
        type : 'logout-success'
    };
}

export const loginSuccess = (loginData) => {
    return {
        type : 'login-success',
        data : loginData

    }
}

export const updateSuccess = ({ displayName, image }) => {
    return {
        type : 'update-success',
        data : {
            displayName,
            image
        }
    }
}

export const loginHandler = (creds) => {
    return async function(dispatch) {
        const response = await login(creds);

        const loginState = {
            username : creds.username,
            displayName : response.data.displayName,
            password : creds.password,
            image : response.data.image
        }
                
        dispatch(loginSuccess(loginState));

        return response;
    }
}

export const signUpHandler = (user) => {
    return async function(dispatch) {
        const response = await signUp(user);
        await dispatch(loginHandler(user));
        return response
    }
}