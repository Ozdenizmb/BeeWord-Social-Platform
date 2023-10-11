import React, { useState } from "react";
import Input from "../Components/input";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/authActions";

const LoginPage = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();

    const onChangeVeriables = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if(name === 'username') {
            setUsername(value);
        }
        else if(name === 'password') {
            setPassword(value);
        }
        setError(null);

    };

    const onClickLogin = async event => {
        event.preventDefault();

        const creds = {
            username,
            password
        }

        setError(null);

        try {
            await dispatch(loginHandler(creds));
            props.history.push('/');
        }
        catch(apiError) {
            setError(apiError.response.data.message);
        }
    };

    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
    };

    const { t } = useTranslation();

    const buttonEnabled = username && password;

    const pendingApiCall = useApiProgress('post','/api/1.0/auth');

    return(
        <div className="container">
            <form>

                <h1 className="text-center">{t('Login')}</h1>

                <Input name="username" label={t("Username")} type="text" onChangeVeriables={onChangeVeriables} ></Input>
                <Input name="password" label={t("Password")} type="password" onChangeVeriables={onChangeVeriables} ></Input>

                { error ? <div className="alert alert-danger">{t(error)}</div> : ""}
                
                <div className="text-center">
                    <button 
                        className="btn btn-primary"
                        onClick={onClickLogin}
                        disabled = {!buttonEnabled || pendingApiCall}
                    >
                        {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                        {t('Login')}
                    </button>
                </div>

                <div>

                    <img
                        src="https://flagsapi.com/TR/flat/24.png"
                        alt="Turkish Flag"
                        onClick={() => onChangeLanguage('tr')}
                        style={{cursor: 'pointer'}}>
                    </img>

                    <img
                        src="https://flagsapi.com/US/flat/24.png"
                        alt="USA Flag"
                        onClick={() => onChangeLanguage('en')}
                        style={{cursor: 'pointer'}}>
                    </img>

                </div>

            </form>
        </div>
    );

}

export default LoginPage;