import axios from 'axios';

const DEV_URL = 'http://localhost:8000';
const PROD_URL = 'https://qoaba=prod';
const STAGE_URL = 'https://qoaaba-stage';

const getCurrentUrl = () => window.location.href;

const isProd = getCurrentUrl().includes("qoaba-prod");
const isStage = getCurrentUrl().includes("qoaba-stage");
const isDev = !(isProd || isStage);


const API = axios.create({
    baseURL: (
        isDev ? DEV_URL : (
            isProd ? PROD_URL : STAGE_URL
        )
    )
});

// Import this object instead of axios
// make API requests like:
// API.get("/api/login").then(...)
export default API;