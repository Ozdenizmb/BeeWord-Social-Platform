import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import UserList from '../Components/UserList';
import BeePost from '../Components/BeePost';
import { useSelector } from 'react-redux';
import BeePostFeed from '../Components/BeePostFeed';

const HomePage = () => {

    const { isLoggedIn } = useSelector((store) => ({isLoggedIn : store.isLoggedIn}));

    const onChangeLanguage = language => {
        i18n.changeLanguage(language);
    };

    const { t } = useTranslation();

    return (
        <div className="container">
            
            <div className="row">

                    <div className="col">
                        { isLoggedIn &&
                            <div className="mb-1">
                                <BeePost />
                            </div>
                        }
                        <BeePostFeed />
                    </div>

                    <div className="col">
                        <UserList />
                    </div>

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

        </div>
    );

}

export default HomePage;