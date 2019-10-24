import axios from 'axios'
export const instance = axios.create({
    baseURL: 'https://atropp.dev/api',
    headers: {
      'Access-Control-Allow-Origin': 'https://atropp.dev'
    }
  });
  // https://atropp.dev
  // http://localhost:3001
  // http://localhost:5000

  export const displayDate = jsDateObj => `${jsDateObj.getMonth() + 1}.${jsDateObj.getDate()}.${jsDateObj.getFullYear()}`