import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import UserListItem from './UserListItem';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const UserList = () => {

    const [page, setPage] = useState({
        content : [],
        size : 3,
        number : 0
    });

    const pendingApiCall = useApiProgress('get','/api/1.0/users?page');

    useEffect(() => {
        loadPage();
    }, []);

    const onClickNext = () => {
        const nextPage = page.number + 1;

        loadPage(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;

        loadPage(previousPage);
    }

    const loadPage = (pageNumber) => {
        getUsers(pageNumber).then(response => {
            setPage(response.data);
        });
    }

    const { t } = useTranslation();
    const { content : users, last, first } = page;

    let actionDiv = (
        <div>
                {first === false &&
                    <button className="btn btn-sm btn-light" onClick={onClickPrevious}>
                        {t('Previous')}
                    </button>
                }
                {last === false &&
                    <button className="btn btn-sm btn-light float-end" onClick={onClickNext}>
                        {t('Next')}
                    </button>
                }
        </div>
    );

    if(pendingApiCall) {
        actionDiv = (
            <Spinner />
        );
    }

    return (
        <div className="card">
            <h3 className="card-header text-center">{t('Users')}</h3>
            <div className="list-group list-group-flush">
                {
                    users.map(user => (
                        <UserListItem  key={user.username} user={user}/>
                    ))
                }
            </div>
            {actionDiv}
        </div>
    );

}

export default UserList;