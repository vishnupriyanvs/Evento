import CryptoJS from "crypto-js";



const encryptData = (data) => {
    let dataToBeEncrypted;
    if (typeof data === "string") dataToBeEncrypted = data;
    else if (typeof data === "number") dataToBeEncrypted = data.toString();
    return CryptoJS.AES.encrypt(dataToBeEncrypted, 'j#$!@j$%^vsv!~!jn*fkt7#$sg(*7jmr09@#%$jshsuoheedpak*&^#$#').toString();
  }

export default encryptData;