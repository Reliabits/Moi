/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 30/01/2023 - 16:23:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/01/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import React, { useEffect, useState, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/Dashboard/Home/HomeScreen";
import GoldDeposit from "./src/screens/Dashboard/Home/GoldDeposit/GoldDeposit";
import SplashScreen from "./src/screens/Auth/SplashScreen";
import ApplyLoanScreen from "./src/screens/Dashboard/Home/ApplyLoanScreen";
import LoginPageOne from "./src/screens/Auth/LoginPageOne";
import Otp from "./src/screens/Auth/Otp";
import LoginPageTwo from "./src/screens/Auth/LoginPageTwo";
import Loans from "./src/screens/Dashboard/Home/Loans";
import GoldPage from "./src/screens/Dashboard/Home/GoldPage";
import PaymentGateway from "./src/screens/Dashboard/Home/PaymentGateway";
import PaymentProgress from "./src/screens/Dashboard/Home/PaymentProgress";
import ViewProfile from "./src/screens/ViewProfile";
import CompleteKYC from "./src/screens/CompleteKYC";
import UserName from "./src/screens/Auth/UserName";
import Age from "./src/screens/Auth/Age";
import Gender from "./src/screens/Auth/Gender";
import Success from "./src/screens/Auth/Success";
import { NativeBaseProvider } from "native-base";
import PaymentPayu from "./src/screens/Dashboard/Home/GoldDeposit/PaymentPayu";
import LoanStart from "./src/screens/Dashboard/Home/LoanStart";
import Transaction from "./src/screens/Transaction";
import { useSelector } from "react-redux";
import Loader from "./src/components/Loader";
import PaymentBreakDown from "./src/screens/Dashboard/Home/PaymentBreakDown";
import Pancard from "./src/screens/Pancard";
import SellGold from "./src/screens/Dashboard/Home/SellGold";
import SelectAcount from "./src/screens/Dashboard/Home/SelectAcount";
import ConfirmWithdraw from "./src/screens/Dashboard/Home/ConfirmWithdraw";
import OrderDetail from "./src/screens/Dashboard/Home/OrderDetail";
import Pin from "./src/screens/Auth/Pin";
import Address from "./src/screens/Dashboard/Home/Address";
import AddAddress from "./src/screens/Dashboard/Home/AddAddress";
import ScreenOne from "./src/screens/PinCode/ScreenOne";
import ScreenTwo from "./src/screens/PinCode/ScreenTwo";
import ScreenThree from "./src/screens/PinCode/ScreenThree";
import ScreenFour from "./src/screens/PinCode/ScreenFour";
import PinCode from "./src/screens/PinCode/PinCode";
import VerifyPinCode from "./src/screens/PinCode/VerifyPinCode";
import CreateAccount from "./src/screens/Auth/CreateAccount";
import Signin from "./src/screens/Auth/Signin";
import congrates from "./src/screens/Auth/congrates";
import Approved from "./src/screens/Approved";
import Reject from "./src/screens/Reject";
import PriceAlert from "./src/screens/PriceAlert";
import AlertPriceList from "./src/screens/AlertPriceList";
import UserInactivity from 'react-native-user-inactivity';
import BackgroundTimer from 'react-native-user-inactivity/lib/BackgroundTimer';
import ValidateUpi from "./src/screens/Auth/ValidateUpi";
import Trend from "./src/screens/Dashboard/Home/Trend";
import RedeemGold from "./src/screens/RedeemGold";
import GetHelp from "./src/screens/GetHelp";
// import UserDetail from "./src/screens/Auth/UserDetails";
import Notification from "./src/screens/Dashboard/Notification";
import ReferrelCode from "./src/screens/Dashboard/Home/ReferrelCode"
import Splash from "./src/v1.2/screen/Splash";
import Accounts from "./src/v1.2/screen/Accounts";
import Login from "./src/v1.2/screen/Login";
import OtpScreen from "./src/v1.2/screen/OtpScreen";

import DetailUser from "./src/v1.2/screen/DetailUser";
import GoldTransaction from "./src/screens/GoldTransaction";



const Stack = createNativeStackNavigator();
function OnBoardingStack() {

  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"

      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PaymentBreakDown" component={PaymentBreakDown} />
      <Stack.Screen name="ApplyLoanScreen" component={ApplyLoanScreen} />
      <Stack.Screen name="GoldDeposit" component={GoldDeposit} />
      <Stack.Screen name="LoginPageOne" component={LoginPageOne} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="LoginPageTwo" component={LoginPageTwo} />
      <Stack.Screen name="Loans" component={Loans} />
      <Stack.Screen name="LoanStart" component={LoanStart} />
      <Stack.Screen name="Buy Gold" component={GoldPage} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="PaymentGateway" component={PaymentGateway} />
      <Stack.Screen name="PaymentProgress" component={PaymentProgress} />
      <Stack.Screen name="Kyc" component={CompleteKYC} />
      <Stack.Screen name="UserName" component={UserName} />
      <Stack.Screen name="Age" component={Age} />
      <Stack.Screen name="Pancard" component={Pancard} />
      <Stack.Screen name="Gender" component={Gender} />
      <Stack.Screen name="Success" component={Success} />
      {/* <Stack.Screen name="Transaction" component={Transaction} /> */}
      <Stack.Screen name="PaymentPayu" component={PaymentPayu} />
      <Stack.Screen name="Sell Gold" component={SellGold} />
      <Stack.Screen name="SelectAccount" component={SelectAcount} />
      <Stack.Screen name="ConfirmWithdraw" component={ConfirmWithdraw} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="Pin" component={Pin} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
      <Stack.Screen name="ScreenThree" component={ScreenThree} />
      <Stack.Screen name="ScreenFour" component={ScreenFour} />
      <Stack.Screen name="PinCode" component={PinCode} />
      <Stack.Screen name="VerifyPinCode" component={VerifyPinCode} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="congrates" component={congrates} />
      <Stack.Screen name="ReferrelCode" component={ReferrelCode} />

      <Stack.Screen name="Approved" component={Approved} />
      <Stack.Screen name="Reject" component={Reject} />
      <Stack.Screen name="PriceAlert" component={PriceAlert} />
      <Stack.Screen name="AlertPriceList" component={AlertPriceList} />
      <Stack.Screen name="ValidateUpi" component={ValidateUpi} />
      <Stack.Screen name="Trend" component={Trend} />
      <Stack.Screen name="RedeemGold" component={RedeemGold} />
      {/* <Stack.Screen name="UserDetail" component={UserDetail} /> */}
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Get Help" component={GetHelp} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Accounts" component={Accounts} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="DetailUser" component={DetailUser} />
      <Stack.Screen name="Transaction" component={GoldTransaction} />

      
    </Stack.Navigator>
  );
}
const NavigationScreen = () => {
  const dataRedux = useSelector(state => state)
  const [active, setActive] = useState(true);
  // const [timer, setTimer] = useState(8000);
  const [userToken , setUserToken] = useState("")


  // const asyncToken = async () => {
  //   const token = await AsyncStorage.getItem("token")
  //   console.log(" async token", token)
  //   setUserToken(token);
  //   // setNotifie(token)
  // }
// console.log("active :",active )

  
  

  // useEffect(() => {
    

    // setTimeout(() => {

    //   console.log('set Timeout')

    //   setActive(false)

    // }, 900000)
  // },[])
  
  







  return (
    <NativeBaseProvider>
      <Loader loading={dataRedux?.LOADER} />
      <NavigationContainer>
        {/* <UserInactivity
          skipKeyboard={true}
          timeoutHandler={BackgroundTimer}
          // children={true}
          isActive={active}
          timeForInactivity={8000}
          // checkInterval={1000}
          onAction={isActive => { setActive(isActive); }}> */}
        {
          // active ?
            OnBoardingStack()
            // userToken ?
            // <VerifyPinCode setActive={setActive} verifyCode={true} />  
            // :
            // OnBoardingStack()
          }
        {/* </UserInactivity> */}
      </NavigationContainer>


    </NativeBaseProvider>
  );
};

export default NavigationScreen;
