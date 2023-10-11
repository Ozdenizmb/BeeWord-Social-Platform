import React from 'react';
import ProfileImage from './ProfileImage';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';

const BeePostView = (props) => {
    const {savedPost} = props;
    const {user, content, timestamp} = savedPost;
    const {username, displayName} = user;

    const { i18n } = useTranslation();

    const formatted = format(timestamp, i18n.language);

    return (
        <div className="card p-1">
            <div className="d-flex">
                <ProfileImage user={user} width={32} height={32} imageCss="m-1"/>
                <div className="flex-fill m-auto ps-2">
                    <Link to={"/user/" + username} className="text-dark text-decoration-none">
                        <h6 className="d-inline">
                            {displayName}@{username}
                        </h6>
                        <span> - </span>
                        <span>{formatted}</span>
                    </Link>
                </div>
            </div>
            <div className="ps-5">
                {content}
            </div>
        </div>
    );
};

export default BeePostView;