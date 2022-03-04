
import axios from 'axios';

export const fetchUsers = async () => {
    const { data } = await axios.get('/users/1/user');
    return data;
};

export const fetchMqtt = async () => {
    const { data } = await axios.get('/mqtt/all');
    return data;
};

