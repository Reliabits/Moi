import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import fonts from '../../theme/fonts'
import yellowC from '../../assets/images/yellowC.png'
import pin2 from '../../assets/images/pin2.png'
import PureGold from '../../assets/images/PureGold.png'
import dot1 from '../../assets/images/dot1.png'
import dot2 from '../../assets/images/dot2.png'
import { LinearGradient } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'

const ScreenTwo = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.main}>
            <View style={styles.heading}>
                <Text style={{
                    color: '#FFEF22', fontSize: 16, fontFamily: fonts.MontserratBold,
                }}>Withdraw savings to your bank</Text>
            </View>

            <View style={{ width: '100%', paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', marginTop: 64 }}>
                <Image source={yellowC} />
                <View style={{ position: 'absolute', bottom: 2 }}>
                    <Image source={pin2} />
                </View>
                <View style={{
                    position: 'absolute', top: 130
                }}>
                    <Image source={PureGold} />
                </View>
            </View>

            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 110, paddingHorizontal: 20 }}>
                <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 24 }}>
                    Buy or Sell 99.5%
                   
                </Text>
                <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 24 }}>
                
                    Pure 24K Gold
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
                    <Image source={dot2} style={{ marginHorizontal: 5 }} />
                    <Image source={dot1} style={{ marginHorizontal: 5 }} />
                    
                    <Image source={dot2} style={{ marginHorizontal: 5 }} />
                </View>


                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>


                    <TouchableOpacity onPress={()=> {navigation.navigate("ScreenThree")}} style={{ backgroundColor: '#F5A20D', justifyContent: 'center', alignItems: 'center', width: 175, height: 40, borderRadius: 30, marginTop: 70 }}>
                        <Text style={{ color: 'black', fontFamily: fonts.MontserratBold, fontSize: 12 }}>
                            Start Now
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'black'

    },
    heading: {
        width: '100%',
        justifyContent: 'center', alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 132
    }
})

export default ScreenTwo