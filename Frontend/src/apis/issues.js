import axios from "axios";

// use axios with proxy uri set in package.json to ping local host in development
export default axios.create();
