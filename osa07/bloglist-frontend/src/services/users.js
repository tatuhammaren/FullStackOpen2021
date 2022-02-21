import axios from 'axios';

const URL = 'http://localhost:3001/api/users';

const getUsers = async () => {
  const res = await axios.get(URL);
  return res.data;
};




export default { getUsers };