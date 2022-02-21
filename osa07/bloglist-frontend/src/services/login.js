import axios from 'axios';

const URL = 'http://localhost:3001/api/login';


const login = async creds => {
  //  console.log(creds)
  const res = await axios.post(URL, creds);
  return res.data;
};

const exp = { login };

export default exp;