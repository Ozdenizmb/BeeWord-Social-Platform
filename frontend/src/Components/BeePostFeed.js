import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import BeePostView from './BeePostView';
import { useApiProgress } from '../shared/ApiProgress';

const BeePostFeed = () => {
    const [beePage, setBeePage] = useState({ content: [], last: true, number: 0 });

    const pendingApiCall = useApiProgress('get','/api/1.0/posts');

    useEffect(() => {
        loadBeePost();
    }, []);

    const loadBeePost = async (page) => {
        try {
            const response = await getPosts(page);
            setBeePage(previousPostPage => ({
                ... response.data,
                content: [...previousPostPage.content, ...response.data.content]
            }));
        }
        catch(error) {

        }
    }

    const onClickLoadPost = () => {
        loadBeePost(beePage.number + 1);
    }

    const { t } = useTranslation();

    if(beePage.content.length === 0) {
        return (
            <div className="alert alert-secondary text-center">
                {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : t("There are no posts")}
            </div>
        );
    }

    return (
        <div>
            {beePage.content.map(savedPost => {
                return <BeePostView key={savedPost.id} savedPost={savedPost}/>;
            })}
            {!beePage.last &&
            <div
                className="alert alert-secondary text-center"
                style={{cursor: pendingApiCall ? 'not-allowed' : 'pointer'}}
                onClick={pendingApiCall ? undefined : onClickLoadPost}>
                {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : t("Load Old Posts")}
            </div>
            }
        </div>
    );
};

export default BeePostFeed;