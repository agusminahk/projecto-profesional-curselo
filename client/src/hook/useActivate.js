import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const toastMessage = (toast, state, title, position = 'bottom') => {
    return toast({
        title: `${title}`,
        status: `${state}`,
        position: `${position}`,
        isClosable: true,
        variant: 'solid',
        duration: 2000,
    });
};

const useActivate = () => {
    const toast = useToast();
    const [restaurants, setRestaurants] = useState([]);

    const _handleReject = async (id, name) => {
        try {
            await axios.delete(`/api/superAdmin/delete/${id}`);
            return toastMessage(toast, 'warning', `Denegando a "${name.toUpperCase()}"`, 'top');
        } catch (error) {
            console.error({ useActivate: error.message });
        }
    };

    const _handleActivate = async (id, name) => {
        try {
            await axios.put(`/api/superAdmin/enable/${id}`);
            return toastMessage(toast, 'info', `Activando a "${name.toUpperCase()}"`, 'top');
        } catch (error) {
            console.error({ useActivate: error.message });
        }
    };

    useEffect(() => {
        fetchRest();
        async function fetchRest() {
            try {
                const { data, status } = await axios.get('/api/superAdmin/clients?state=false');
                if (status === 200) setRestaurants(data);
            } catch (error) {
                console.error({ useActivate: error.message });
            }
        }
    }, []);
    return { restaurants, setRestaurants, _handleReject, _handleActivate };
};

export default useActivate;
