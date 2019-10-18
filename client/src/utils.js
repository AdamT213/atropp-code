import axios from 'axios'
export const instance = axios.create({
    baseURL: 'https://atroppcode.adt6261.now.sh/api',
    headers: {
      'Access-Control-Allow-Origin': 'https://atroppcode.adt6261.now.sh'
    }
  });
  // https://atroppcode.adt6261.now.sh
  // http://localhost:3001
  // http://localhost:5000