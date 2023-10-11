import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import ProfileCard from '../Components/ProfileCard';
import { useState } from 'react';
import { getUser } from '../api/apiCalls';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../Components/Spinner';

const UserPage = () => {

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    const { username } = useParams();

    const pendingApiCall = useApiProgress('get','/api/1.0/users/' + username);

    useEffect(() => {
        loadUser();
    }, [username]);

    const loadUser = async () => {
        try {
            const response = await getUser(username);
            setUser(response.data);
            setNotFound(false);
        }
        catch(error) {
            setNotFound(true);
        }
    };

    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
    };

    const { t } = useTranslation();

    if(pendingApiCall) {
        return (
            <Spinner />
        );
    }

    if(notFound) {
        return(
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <span className="material-icons" style={{fontSize: '48px'}}>error</span>
                    </div>
                    User Not Found
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <ProfileCard user={user} />

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

        </div>
    );

}

export default UserPage;