import axios from 'axios';

async function apiHandler(method, url, inputs = '', contentType = true) {

  if (contentType) {
    var config = {
      method: method,
      url: `http://localhost:4000/${url}`,
      data: inputs,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('myToken')}`,
        'Content-Type': 'application/json'
      }
    }
  } else {
    var config = {
      method: method,
      url: `http://localhost:4000/${url}`,
      data: inputs,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('myToken')}`,
      }
    }
  }

  const data = await axios(config)
  try {
    return data;
  } catch (error) {
    alert('Not Authorized');
    return error;
  }
}


export default apiHandler;