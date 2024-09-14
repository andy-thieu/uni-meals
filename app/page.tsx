'use client'

import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Canteen {
    id: string;
    name: string;
    universities: string[];
}

export default function Home() {
    const uniMapping: { [key: string]: string } = {
        "HTW": "Hochschule für Technik und Wirtschaft Berlin",
        "FU": "Freie Universität Berlin",
        "TU": "Technische Universität Berlin",
        "HU": "Humboldt-Universität zu Berlin",
        "BHT": "Berliner Hochschule für Technik ",
        "HWR": "Hochschule für Wirtschaft und Recht Berlin",
        "ASH": "Alice Salomon Hochschule Berlin",
        "Charite": "Charité - Universitätsmedizin Berlin",
        "IU": "IU Internationale Hochschule",
        "EHB": "Evangelische Hochschule Berlin",
        "HSAP": "Hochschule für Soziale Arbeit und Pädagogik",
        "DFFB": "Deutsche Film- und Fernsehakademie Berlin",
        "HfS": "Hochschule für Schauspielkunst Ernst Busch ",
    };

    const [allCanteens, setAllCanteens] = useState<Canteen[]>([]);
    const [filteredCanteens, setFilteredCanteens] = useState<Canteen[]>([]);
    const [selectedUniName, setSelectedUniName] = useState<string>("");
    const [selectedUniAbbreviation, setSelectedUniAbbreviation] = useState<string>("HTW");

    const fetchCanteens = async () => {
        try {
            const response = await axios.get('https://mensa.gregorflachs.de/api/v1/canteen?loadingtype=lazy', {
                headers: {
                    'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
                }
            });
            setAllCanteens(response.data);
            const defaultAbbreviation = "HTW";
            setSelectedUniAbbreviation(defaultAbbreviation);
            setSelectedUniName(uniMapping[defaultAbbreviation]);
        } catch (error) {
            console.error("Error fetching canteens:", error);
        }
    };

    useEffect(() => {
        fetchCanteens();
    }, []);

    useEffect(() => {
        const filtered = allCanteens.filter(canteen =>
            canteen.universities.includes(selectedUniName)
        );
        setFilteredCanteens(filtered);
    }, [allCanteens, selectedUniName]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUniAbbreviation = event.target.value;
        const selectedUniName = uniMapping[selectedUniAbbreviation] || "";
        setSelectedUniAbbreviation(selectedUniAbbreviation);
        setSelectedUniName(selectedUniName);
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>uni/meals</h1>
                <div className={styles.selectWrapper}>
                    <select value={selectedUniAbbreviation} onChange={handleSelectChange}>
                        {uniMapping && Object.keys(uniMapping).map((uniAbbreviation: string, index: number) => (
                            <option key={index} value={uniAbbreviation}>
                                {uniAbbreviation}
                            </option>
                        ))}
                    </select>
                    {selectedUniName && (
                        <select className={styles.canteenSelect}>
                            {filteredCanteens.map((canteen: Canteen, index: number) => (
                                <option key={index} value={canteen.name}>{canteen.name}</option>
                            ))}
                        </select>
                    )}
                </div>
            </header>
            <main className={styles.main}>
                <h2>Speiseplan</h2>
            </main>
        </div>
    );
}
