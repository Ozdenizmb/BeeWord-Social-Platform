const defaultState = {
    isLoggedIn : false,
    username : undefined,
    displayName : undefined,
    image : undefined,
    password : undefined
}

const authReducer = (state = {... defaultState}, action) => {
    if(action.type === 'logout-success') {
        return defaultState;
    }
    else if(action.type === 'login-success') {
        return {
            ... action.data,
            isLoggedIn : true
        };
    }
    else if(action.type === 'update-success') {
        return {
            ... state,
            displayName : action.data.displayName,
            image : action.data.image
        }
    }
    return state;
};

export default authReducer;