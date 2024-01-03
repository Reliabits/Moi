import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import congratulation from '../../assets/images/congratulation.png'
import fonts from '../../theme/fonts'

const congrates = () => {
    return (
        <View style={styles.mainView}>
            <Image source={congratulation} />



            <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratRegular, fontSize: 12, marginTop: 20 }}>
                Your account is ready to use. You will be 
            </Text>
            <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratRegular, fontSize: 12 }}>
                redirected to the home page in a few seconds.
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 21

    }
})

export default congrates