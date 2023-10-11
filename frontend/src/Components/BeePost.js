import React from 'react';
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sharePost } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';

const BeePost = () => {

    const { image } = useSelector((store) => ({image : store.image}));
    const user = { image : image };
    const [focused, setFocused] = useState(false);
    const [postData, setPostData] = useState('');
    const [errors, setErrors] = useState({});

    const pendingApiCall = useApiProgress('post', '/api/1.0/posts');

    const onFocusTextArea = () => {
        setFocused(true);
    }
    const onChangeTextArea = (event) => {
        setPostData(event.target.value);
        setErrors({});
    }
    const onClickClose = () => {
        setFocused(false);
        setPostData('');
        setErrors({});
    }
    const onClickPost = async () => {
        const body = {
            content : postData
        }
        
        try {
            await sharePost(body);
            setFocused(false);
            setPostData('');
        }
        catch(error) {
            if(error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    }

    let textAreaClassName = "form-control"
    if(errors.content) {
        textAreaClassName += " is-invalid";
    }

    const { t } = useTranslation();

    return (
        <div className="card p-1 flex-row">
            <ProfileImage user={user} width="32" height="32" imageCss={"me-1"}/>
            <div className="flex-fill">
                <textarea
                    className={textAreaClassName}
                    rows={focused ? "3" : "1"}
                    onFocus={onFocusTextArea}
                    onChange={onChangeTextArea}
                    value={postData}
                />
                <div className="invalid-feedback">{errors.content}</div>
                {focused && <div className="text-end mt-1">
                    <button className="btn btn-primary" onClick={onClickPost} disabled={pendingApiCall}>
                        {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                        Post
                    </button>
                    <button className="btn btn-light d-inline-flex ms-1" onClick={onClickClose} disabled={pendingApiCall}>
                        <span className="material-icons">close</span>
                        {t("Cancel")}
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default BeePost;