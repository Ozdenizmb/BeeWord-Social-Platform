import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/BeeWordLogo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import ProfileImage from './ProfileImage';

const TopBar = () => {

    const { username, isLoggedIn, displayName, image } = useSelector(store => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        image: store.image
    }));

    const user = {
        image : image
    };

    const dispatch = useDispatch();
    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    };

    const menuArea = useRef(null);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return() => {
            document.removeEventListener('click', menuClickTracker);
        }
    }, [isLoggedIn]);

    const menuClickTracker = (event) => {
        if(menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }

    const onClickDropDown = () => {
        setMenuVisible(true);
    }

    const onClickProfile = () => {
        setMenuVisible(false);
    }

    let links = (
        <ul className="navbar-nav">
            <li>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link className="nav-link" to="/signup">
                    Sign Up
                </Link>
            </li>
        </ul>
    );

    if(isLoggedIn) {
        let dropdownClass = 'dropdown-menu p-0 shadow';
        if(menuVisible) {
            dropdownClass += ' show';
        }

        links = (
            <ul className="navbar-nav" ref={menuArea}>
                <li>

                    <div className="d-flex" style={{cursor: 'pointer'}} onClick={onClickDropDown}>
                        <ProfileImage user={user} width={"32"} height={"32"} imageCss="m-auto" />
                        <span className="nav-link dropdown-toggle">{displayName}</span>
                    </div>

                    <div className={dropdownClass}>
                        <Link className="dropdown-item d-flex p-2" to={"/user/" + username} onClick={onClickProfile}>
                            <span className="material-icons text-info me-2">person</span>
                            My Profile
                        </Link>
                        <span className="dropdown-item d-flex p-2" style={{cursor:'pointer'}} onClick={onLogoutSuccess}>
                            <span className="material-icons text-danger me-2">power_settings_new</span>
                            Logout
                        </span>
                    </div>

                </li>
            </ul>
        );
    }

    return (
        <div className="shadow-sm bg-body-tertiary mb-2">
            <nav className="navbar container navbar-expand">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="140" alt="Hoaxify Logo"/>
                    </Link>

                    {links}

                </div>
            </nav>
        </div>
    );

};

export default TopBar;