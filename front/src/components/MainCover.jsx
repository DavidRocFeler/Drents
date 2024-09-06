import React from 'react';
import styles from '../styles/MainCover.module.css'
import imageCover from '../assets/portada.jpg'

const MainCover = () => {
    return (
        <div className={styles.portada}>
            <figure>
                <img src={imageCover} alt=""/>
            </figure>
            <h2>Sign up and Browse as a tenant or homeowner</h2>
        </div>
    );
};

export default MainCover;