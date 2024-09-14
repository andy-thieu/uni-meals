import React from "react";
import styles from "./menu-component.module.css";

interface MenuProps {
    canteenId: string
}

const MenuComponent : React.FC<MenuProps> = ({canteenId}) => {
    return (
        <div className={styles.main}>
            <h2>Speiseplan</h2>
            {canteenId}
        </div>
    );
};

export default MenuComponent;