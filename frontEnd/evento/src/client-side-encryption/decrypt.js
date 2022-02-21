import CryptoJS from "crypto-js";


const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, 'j#$!@j$%^vsv!~!jn*fkt7#$sg(*7jmr09@#%$jshsuoheedpak*&^#$#');
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  export default decryptData;