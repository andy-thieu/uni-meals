import HeaderWithMenu from "./components/header-with-menu";
import axios from "axios";

export default async function Home() {
    interface Canteen {
        id: string;
        name: string;
        universities: string[];
    }

    // Fetch data on the server-side
    const response = await axios.get('https://mensa.gregorflachs.de/api/v1/canteen?loadingtype=lazy', {
        headers: {
            'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
        }
    });

    const allCanteens: Canteen[] = response.data;

    // Pass the fetched canteens to a client component
    return (
        <div>
            <HeaderWithMenu canteens={allCanteens} />
        </div>
    );
}
