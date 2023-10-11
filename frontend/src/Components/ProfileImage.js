import React from 'react';
import defaultImage from '../assets/profile.png';

const ProfileImage = ({ user, width, height, tempImage, imageCss }) => {

    let imageSource = defaultImage;
    if(user.image) {
        imageSource ='images/' + user.image;
    }

    const onErrorImage = (event) => {
        event.target.src = defaultImage;
    }

    return (
        <img
            className={"rounded-circle " + imageCss} 
            width={width} height={height}
            alt={user.username + " profile"} src={ tempImage || imageSource}
            onError = {onErrorImage}>
        </img>
    );
};

export default ProfileImage;