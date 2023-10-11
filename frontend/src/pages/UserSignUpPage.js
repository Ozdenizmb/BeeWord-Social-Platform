import React from 'react';
import { backEndChangeLanguage } from '../api/apiCalls';
import Input from '../Components/input';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signUpHandler } from '../redux/authActions';
import { useState } from 'react';

const UserSignUpPage = (props) => {

    const [username, setUsername] = useState();
    const [displayName, setDisplayName] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onChangeVeriables = event => {

        const value = event.target.value;
        const name = event.target.name;

        const errorsCopy = {... errors};
        errorsCopy[name] = undefined;

        if(name == 'password' || name == 'passwordRepeat') {
            if(name == 'password' && value != passwordRepeat) {
                errorsCopy.passwordRepeat = t('Password Mismatch');
            }
            else if(name == 'passwordRepeat' && value != password) {
                errorsCopy.passwordRepeat = t('Password Mismatch');
            }
            else {
                errorsCopy.passwordRepeat = undefined;
            }
        }

        if(name === 'username') {
            setUsername(value);
        }
        else if(name === 'displayName') {
            setDisplayName(value);
        }
        else if(name === 'password') {
            setPassword(value);
        }
        else if(name === 'passwordRepeat') {
            setPasswordRepeat(value);
        }
        setErrors(errorsCopy);
        
    };

    const onClickSignUp = async event => {
        event.preventDefault();

        const body = {
            username,
            displayName,
            password
        }

        try {
            await dispatch(signUpHandler(body));
            props.history.push('/');
        }
        catch(error) {
            if(error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }

    };

    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
        backEndChangeLanguage(language);
    };
    

    const {username:usernameError, displayName:displayNameError, password:passwordError, passwordRepeat:passwordRepeatError} = errors

    const pendingApiCallSignUp = useApiProgress('post','/api/1.0/users');
    const pendingApiCallLogin = useApiProgress('post','/api/1.0/auth');
    const pendingApiCall = pendingApiCallSignUp || pendingApiCallLogin;

    return(

        <div className="container">
            <form>

                <h1 className="text-center">{t('Sign Up')}</h1>

                <Input name="username" label={t("Username")} type="text" error={usernameError} onChangeVeriables={onChangeVeriables}></Input>

                <Input name="displayName" label={t("Display Name")} type="text" error={displayNameError} onChangeVeriables={onChangeVeriables}></Input>
                    
                <Input name="password" label={t("Password")} type="password" error={passwordError} onChangeVeriables={onChangeVeriables}></Input>
                    
                <Input name="passwordRepeat" label={t("Password Repeat")} type="password" error={passwordRepeatError} onChangeVeriables={onChangeVeriables}></Input>

                    
                <div className="text-center">

                    <button
                        className="btn btn-primary"
                        onClick={onClickSignUp}
                        disabled={pendingApiCall || passwordRepeatError != undefined}
                    >
                        {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                        {t('Sign Up')}
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

export default UserSignUpPage;