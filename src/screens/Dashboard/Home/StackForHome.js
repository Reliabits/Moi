/**
    * @description      : 
    * @author           : sheezy
    * @group            : 
    * @created          : 30/01/2023 - 15:36:59
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 30/01/2023
    * - Author          : sheezy
    * - Modification    : 
**/
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
function OnBoardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        initialRouteName="HomeScreen"
        name="HomeScreen"
        component={HomeScreen}
      />

    </Stack.Navigator>
  );
}
const StackForHome = () => {
  return <>{OnBoardingStack()}</>;
};

export default StackForHome;

const styles = StyleSheet.create({});
