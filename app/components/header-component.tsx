'use client';

import React, { useEffect, useState } from "react";
import styles from "./header-component.module.css";

interface Canteen {
    id: string;
    name: string;
    universities: string[];
}

interface HeaderComponentProps {
    canteens: Canteen[];
    onCanteenSelect: (canteenName: string) => void; // Callback to parent
}

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

function HeaderComponent({ canteens, onCanteenSelect }: HeaderComponentProps) {
    const [filteredCanteens, setFilteredCanteens] = useState<Canteen[]>([]);
    const [selectedUniAbbreviation, setSelectedUniAbbreviation] = useState<string>("HTW");
    const [selectedUniName, setSelectedUniName] = useState<string>("");
    const [selectedCanteen, setSelectedCanteen] = useState<string | null>(null);

    useEffect(() => {
        const defaultAbbreviation = "HTW";
        setSelectedUniAbbreviation(defaultAbbreviation);
        setSelectedUniName(uniMapping[defaultAbbreviation]);
    }, []);

    useEffect(() => {
        const filtered = canteens.filter(canteen =>
            canteen.universities.includes(selectedUniName)
        );
        setFilteredCanteens(filtered);
        // Reset the selected canteen if it’s no longer valid for the new university
        if (selectedCanteen && !filtered.some(c => c.name === selectedCanteen)) {
            setSelectedCanteen(null);
            onCanteenSelect(""); // Clear selected canteen in parent
        }
    }, [selectedUniName]);

    const handleUniSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const uniAbbreviation = event.target.value;
        setSelectedUniAbbreviation(uniAbbreviation);
        setSelectedUniName(uniMapping[uniAbbreviation]);
    };

    const handleCanteenSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCanteenName = event.target.value;
        setSelectedCanteen(selectedCanteenName);
        onCanteenSelect(selectedCanteenName); // Call parent callback with selected canteen
    };

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>uni/meals</h1>
            <div className={styles.selectWrapper}>
                <select value={selectedUniAbbreviation} onChange={handleUniSelect}>
                    {Object.keys(uniMapping).map((uniAbbreviation, index) => (
                        <option key={index} value={uniAbbreviation}>
                            {uniAbbreviation}
                        </option>
                    ))}
                </select>
                {selectedUniName && (
                    <select className={styles.canteenSelect} value={selectedCanteen ?? ""} onChange={handleCanteenSelect}>
                        <option value="">Select a canteen</option>
                        {filteredCanteens.map((canteen, index) => (
                            <option key={index} value={canteen.name}>
                                {canteen.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </header>
    );
}

export default HeaderComponent;
