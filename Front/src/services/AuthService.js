import api from './api.js';

const getUserToken = () => {
    let user = localStorage.getItem('user');
    if(!user) return false;
  
    user = JSON.parse(user);
    api.defaults.headers.common.Authorization = `Bearer ${user.token}`;
  
    return user;
}

const loginAdmin = async (username, password) => {
    try{
      const res = await api.post("/login", {username, password});
      const token = res.data;
      localStorage.setItem('user', JSON.stringify({username, token}));
      console.log(localStorage.user)
      return true;
    }
    catch(error) {
      localStorage.removeItem('user');
      return false;
    }
}

const logOut = () => {
  console.log("user");
  localStorage.removeItem('user');
  api.defaults.headers.common.Authorization = null;
}
  
export default { getUserToken, loginAdmin, logOut };