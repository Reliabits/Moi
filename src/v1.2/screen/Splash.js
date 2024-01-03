import { View, Text , Image, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'
import splashpic from '../../assets/images1.2/splashpic.png'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(function () {
            navigation.navigate("DetailUser")

            // AsyncStorage.getItem('token').then(val => {
            //     // if (!val) {
            //     //     navigation.replace('Login');
            //     // } else {
            //         navigation.replace('DetailUser');
            //     // }
            // })
        }, 1000);
    }, [])

  return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D6E3E7' }}>
          <Image source={splashpic} />
         
          
   </SafeAreaView>
  )
}

export default Splash