import axios from "axios";
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

const facilityManagement = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    headers,
    httpsAgent: agent
})

export default facilityManagement;