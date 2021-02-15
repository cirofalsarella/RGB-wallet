import api from './api.js';

const isLogged = () => {
  let user = localStorage.getItem('user');
  if(!user) return false;

  user = JSON.parse(user);
  api.defaults.headers.common.Authorization = user.token.token;

  return user.username;

  /*
  await api.get('/login/verify/').then((res) => {
    return (res.data.username === user.username)
  });
 */

}

const loginAdmin = async (username, password) => {
  try{
    const res = await api.post("/login", {username, password});
    const token = res.data;
    localStorage.setItem('user', JSON.stringify({username, token}));
    return true;
  }
  catch(error) {
    localStorage.removeItem('user');
    return false;
  }
}

const logOut = () => {
  localStorage.removeItem('user');
  api.defaults.headers.common.Authorization = null;
}
  
export default { isLogged, loginAdmin, logOut };