import axios from 'axios';

async function apiHandler(method,url,inputs=''){
var config = {
    method: method,
    url: `http://localhost:4000/${url}`,
    data: JSON.stringify(inputs),
    headers: { 
      'Authorization': `Bearer ${sessionStorage.getItem('myToken')}`, 
      'Content-Type': 'application/json'
    }
  };
const data = await axios(config)
try {
    return data;
} catch (error) {
    alert('Not Authorized');
    return error;
}
}

export default apiHandler;