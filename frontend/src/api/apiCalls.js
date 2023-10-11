import axios from "axios"

export const signUp = body => {
    return axios.post('/api/1.0/users', body);
};

export const login = creds => {
    return axios.post('/api/1.0/auth', {}, {auth : creds});
};

export const backEndChangeLanguage = language => {
    axios.defaults.headers['Accept-Language'] = language;
};

export const getUsers = (page = 0, size = 3) => {
    return axios.get('/api/1.0/users?page='+page+'&size='+size);
}

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if(isLoggedIn) {
        const userInfo = username + ":" + password;
        const convertBasic = btoa(userInfo);
        const authorizationHeaderValue = "Basic " + convertBasic;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }
    else {
        delete axios.defaults.headers['Authorization'];
    }
};

export const getUser = (username) => {
    return axios.get('/api/1.0/users/' + username);
};

export const updateUser = (username, body) => {
    return axios.put('/api/1.0/users/' + username, body);
};

export const sharePost = (beePost) => {
    return axios.post('/api/1.0/posts', beePost);
};

export const getPosts = (page = 0) => {
    return axios.get('/api/1.0/posts?page='+page);
};