import React from "react";
import styles from '../styles/LinkHomeAndTen.module.css'
import iconElipse from '../assets/iconElipse.jpg'

const LinkHoTn = () => {
    return (
        <div className={styles.usuarios}> 
            <aside className={styles.objectService}>
                <div className={styles.priceService}>
                    <a  href="">I'm a homeowner</a>
                    <img  className={styles.filteredImage} src={iconElipse} alt=""/>
                </div>
                <div>
                    <hr className={styles.hr1} />   
                </div>
            </aside>
            <aside className={styles.objectService} >
                <div className={styles.priceService} >
                    <a  href="">I'm a tenant</a>
                    <img  className={styles.filteredImage} src={iconElipse} alt="" />
                </div>
                <div>
                    <hr className={styles.hr1} />   
                </div>
            </aside>
        </div>
    );
};

export default LinkHoTn;