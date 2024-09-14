'use client'

import React, {useEffect} from "react";
import styles from "./menu-component.module.css";
import axios from "axios";

interface MenuProps {
    canteenId: string
}

const MenuComponent : React.FC<MenuProps> = ({canteenId}) => {

    const [menu, setMenu] = React.useState(null);

    useEffect(() => {
        axios.get(`https://mensa.gregorflachs.de/api/v1/menue?loadingtype=lazy&canteenId=${canteenId}&startdate=2024-07-12&enddate=2024-07-12`, {
            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
            }
        }).then(response => {
            console.log(response.data);
            setMenu(response.data[0].canteenId);
        }).catch(error => {
            console.error(error);
        });
    }, [canteenId]);

    return (
        <div className={styles.main}>
            <h2>Speiseplan</h2>
            {menu}
        </div>
    );
};

export default MenuComponent;