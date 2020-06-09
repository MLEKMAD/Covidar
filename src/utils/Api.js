import axios from 'axios';

const TIMEOUT = 60000;
const HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

class ApiService {

    constructor( baseURL = API_ROOT) {
        const client = axios.create({
            baseURL,
            TIMEOUT,
            HEADERS
        });

        client.interceptors.response.use(this.handleSuccess, this.handleError);
        this.client = client;

    }

    handleSuccess(response) {
        return response;
    }

    handleError(error) {
        return Promise.reject(error);
    }

    get(path) {
        return this.client.get(path).then(response => response.data);
    }

    post(path, payload) {
        return this.client.post(path, payload).then(response => response.data);
    }

    put(path) {
        return this.client.put(path).then(response => response.data);
    }
}

export default ApiService;