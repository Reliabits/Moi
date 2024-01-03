// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//         console.log('Authorization status:', authStatus);
//         setNotification()
        
//     }
// }





// const setNotification = async () => {
//     await messaging().registerDeviceForRemoteMessages();
//     const token = await messaging().getToken();
//     console.log("cloud message token", token);
//     const savetoken = await AsyncStorage.setItem("notification", token)
//     console.log("savetoken", savetoken)
//     const gettoken = await AsyncStorage.getItem("notification")
//     console.log(" notification token", gettoken)
// };

// // const getNotification = async () => {
// //     const token = await AsyncStorage.getItem("notification")
// //     console.log(" notification token", token)

  
   


// // };

// const asyncToken = async () => {
//     const token = await AsyncStorage.getItem("token")
//     console.log(" async token", token)
//     // setNotifie(token)
// }


//  export const Notification = () => {

//     // Assume a message-notification contains a "type" property in the data payload of the screen to open

//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage.notification,
//         );
//         navigation.navigate(remoteMessage.data.type);
//     });

//     // Check whether an initial notification is available
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );
//                 setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//             }
            
//         });



  

//     messaging().onMessage(async remoteMessage => {
//         // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//         console.log("foreground messaging ", remoteMessage)
//     });
// }
    









// // const Notification = async () => {
// //   const token = await AsyncStorage.getItem("notification")
// //   console.log("token", token)
// //   setNotifie(token)

// // }




