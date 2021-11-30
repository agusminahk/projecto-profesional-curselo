import { useEffect, useState } from 'react';
import axios from 'axios';

const useActivate = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRest();
        async function fetchRest() {
            try {
                const { data, status } = await axios.get('api/superAdmin/clients?state=false');
                if (status === 200) setRestaurants(data);
            } catch (error) {
                console.error({ useActivate: error.message });
            }
        }
    }, []);
    return { restaurants, setRestaurants };
};

export default useActivate;
