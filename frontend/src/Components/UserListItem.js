import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const UserListItem = (props) => {

    const { user } = props;

    return (
        <Link to={"/user/"+user.username} className="list-group-item list-group-item-action">

            <ProfileImage user={user} width={"32"} height={"32"}/>

            <span className="px-2">
                {user.username}
            </span>
        </Link>
    );
};

export default UserListItem;