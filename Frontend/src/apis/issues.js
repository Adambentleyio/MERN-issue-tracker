import axios from "axios";

// use axios with proxy uri set in package.json to ping local host in development
export default axios.create({
    baseURL: "http://localhost:5000" || 'https://ticketi.onrender.com'
});
