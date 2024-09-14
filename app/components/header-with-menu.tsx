'use client';

import { useState } from "react";
import HeaderComponent from "./header-component";
import MenuComponent from "./menu-component";

interface Canteen {
    id: string;
    name: string;
    universities: string[];
}

interface HeaderWithMenuProps {
    canteens: Canteen[];
}

export default function HeaderWithMenu({ canteens }: HeaderWithMenuProps) {
    const [selectedCanteen, setSelectedCanteen] = useState<string | null>(null);

    const handleCanteenSelect = (canteenName: string) => {
        setSelectedCanteen(canteenName);
    };

    return (
        <div>
            {/* Pass the canteen list and the selection handler */}
            <HeaderComponent canteens={canteens} onCanteenSelect={handleCanteenSelect} />

            {/* Render MenuComponent based on the selected canteen */}
            {selectedCanteen && <MenuComponent canteenName={selectedCanteen} />}
        </div>
    );
}
