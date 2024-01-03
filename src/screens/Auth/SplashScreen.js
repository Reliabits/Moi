import {StatusBar, StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../assets/colors';
import images from '../../theme/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import splash from '../../assets/images/splash.png';

function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(function () {
      AsyncStorage.getItem('token').then(val => {
        if (!val) {
          navigation.replace('LoginPageTwo');
        } else {
          navigation.replace('HomeScreen');
        }
      })
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.appBack} />

      <Image
        source={splash}
        style={{height: '100%', width: '100%'}}
      />
    </>
  );
}

export default SplashScreen;
