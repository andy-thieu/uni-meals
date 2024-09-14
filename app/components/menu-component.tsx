import React from "react";
import styles from "./menu-component.module.css";

interface MenuProps {
    canteenName: string
}

const MenuComponent : React.FC<MenuProps> = ({canteenName}) => {
    return (
        <div className={styles.main}>
            <h2>Speiseplan</h2>
            {canteenName}
        </div>
    );
};

export default MenuComponent;