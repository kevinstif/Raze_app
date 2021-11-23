import axios from "axios";

export  default axios.create({
    baseURL:'https://razeapp-v1.azurewebsites.net/api/v1',
    headers:{'content-type':'application-json'}
});
