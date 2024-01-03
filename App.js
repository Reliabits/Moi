import React, { useEffect, useState, useRef } from "react";
import {Text, View, StyleSheet, BackHandler, Alert} from 'react-native';
import Store from "./src/Redux/Store";
import { Provider } from "react-redux";
import NavigationScreen from "./NavigationScreen";
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import apis from "./src/lib/apis";
import { ForegroundHandler } from "./src/components/ForegroundHandler";

const App = () => {

  const [loading, setLoading] = useState(true);
  const [notifie, setNotifie] = useState("")
  // const [timer, setTimer] = useState("00:00:00");

  const setNotification = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log("cloud message token", token);
    const savetoken = await AsyncStorage.setItem("notification", token)
    console.log("savetoken", savetoken)
    const gettoken = await AsyncStorage.getItem("notification")
    console.log(" notification token", gettoken)

    // setNotifie(token);
    AddFcm(token);
  };

  // const getNotification = async () => {
  //   const token = await AsyncStorage.getItem("notification")
  //   console.log(" notification token", token)

  //   // setNotifie(token);
  //   AddFcm(token);


  // };

  const asyncToken = async () => {
    const token = await AsyncStorage.getItem("token")
    // console.log(" async token", token)
    // setNotifie(token)
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      setNotification()

    }
  }



  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  // const Ref = useRef(null);

  // The state for our timer



  // const getTimeRemaining = (e) => {
  //   const total = Date.parse(e) - Date.parse(new Date());
  //   const seconds = Math.floor((total / 1000) % 60);
  //   const minutes = Math.floor((total / 1000 / 60) % 60);
  //   const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  //   return {
  //     total, hours, minutes, seconds
  //   };
  // }


  // const startTimer = (e) => {
  //   let { total, hours, minutes, seconds }
  //     = getTimeRemaining(e);
  //   if (total >= 0) {

  //     // update the timer
  //     // check if less than 10 then we need to 
  //     // add '0' at the beginning of the variable
  //     setTimer(
  //       (hours > 9 ? hours : '0' + hours) + ':' +
  //       (minutes > 9 ? minutes : '0' + minutes) + ':'
  //       + (seconds > 9 ? seconds : '0' + seconds)
  //     )
  //   }
  // }


  // const clearTimer = (e) => {

    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    // setTimer('00:05:00');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
  //   if (Ref.current) clearInterval(Ref.current);
  //   const id = setInterval(() => {
  //     startTimer(e);
  //   }, 1000)
  //   Ref.current = id;
  // }

  // const getDeadTime = () => {
  //   let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
  //   deadline.setSeconds(deadline.getSeconds() + 300);
  //   return deadline;
  // }

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  // useEffect(() => {
  //     clearTimer(getDeadTime());
  // }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  // const onClickReset = () => {
  //   clearTimer(getDeadTime());
  // }

  useEffect(() => {

    requestUserPermission()
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigation.navigate(remoteMessage.data.type);
    // });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
    
    // messaging().onMessage(async remoteMessage => {
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   console.log("foreground messaging ", remoteMessage)
    // });
   

    setNotification();
    // getNotification();
    asyncToken();
    AddFcm()

    // clearTimer(getDeadTime());
  




    // const interval = setInterval(() => {
      
    //   clearTimer(getDeadTime());
    // }, 60000);
    // return () => clearInterval(interval);
   


  }, []);

  








  // const Notification = async () => {
  //   const token = await AsyncStorage.getItem("notification")
  //   console.log("token", token)
  //   setNotifie(token)

  // }





  function AddFcm(token) {

    let params = {
      token: token

    };
    console.log(" params", params);
    apis
      .AddFcm(params)
      .then(async (res) => {


        if (res.status == 1) {


          console.log("res ", res)
          console.log("Status", `${res.status}`)


        } else {
          console.log("error", `${res.data.error}`)

        }
      })
      .catch((err) => {

        console.log("err", err);
      });
  }

  return (
    <Provider store={Store}>

      <ForegroundHandler />
      {/* <Inactivity /> */}
      
      
      <NavigationScreen />
    </Provider>
  );
};

export default App;
