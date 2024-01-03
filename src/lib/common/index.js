
import AsyncStorage from '@react-native-async-storage/async-storage'
class Global { }
// import DeviceInfo from 'react-native-device-info';

/**
 *  Set language
 */
Global.setLanguage = code => {
  strings.setLanguage(code);
};

Global.getToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};



// Global.getDeviceToken = async () => {
//   // const token = await AsyncStorage.getItem('fcmToken');
//   let uniqueId = DeviceInfo.getUniqueId();
//   return uniqueId;
// };

Global.getUserDetail = async () =>{
  const user = await AsyncStorage.getItem('user');
  console.log(user);
  return JSON.parse(user)
}

Global.setDeviceToken = async (token) => {
  console.log("Set Player ID: ", token);
  await AsyncStorage.setItem('fcmToken', token);
}



Global.getGoogleUser = async () => {
  const user = await AsyncStorage.getItem('Googleuser');
  console.log(user);
  return JSON.parse(user)
}

Global.fcm_token = async () => {
  const token = await AsyncStorage.getItem('fcmToken');
  return token;
}
export default Global;
