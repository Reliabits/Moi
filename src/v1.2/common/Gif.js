import { View, Text , Image} from 'react-native'
import React from 'react'


const Gif = () => {
  return (
    <View >
          {/* <Image style={{ width: 66, height: 69.96 }} source={require('../../assets/images1.2/verifying.gif')} /> */}
          <Image style={{ width: 66, height: 69.96 }} source={require('../../assets/images1.2/verify.gif')} />
    </View>
  )
}

export default Gif