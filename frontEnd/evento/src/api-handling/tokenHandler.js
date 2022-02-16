import axios from 'axios';

async function tokenHandler(method, url, refreshToken, cb, inputs=''){
    var config = {
        method: 'post',
        url: `http://localhost:4000/users/relogin`,
        data: JSON.stringify({
            refreshToken:refreshToken
        }),
        headers: {  
          'Content-Type': 'application/json'
        }
      };

      const response = await axios(config);
      console.log(response.data);
      const token = response.data.accessToken;
      sessionStorage.setItem('myToken', token)
    //   sessionStorage.setItem('refreshToken', newRefreshToken)
      return await cb(method,url,inputs='')
     

}

export default tokenHandler;