import axios from 'axios';
export const axiosApi = axios.create({
    baseURL: 'https://chat-compass-default-rtdb.europe-west1.firebasedatabase.app/'
})