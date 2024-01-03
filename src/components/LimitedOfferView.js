import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import AppLogo from '../assets/svg/AppLogo.svg';
import ButtonNoLine from './ButtonNoLine';
import fonts from '../theme/fonts';
const LimitedOfferView = () => {
  return (
    <View style={styles.card}>
      <View style={{width: '30%'}}>
        <AppLogo height={150} width={85}></AppLogo>
      </View>
      <View style={{width: '70%'}}>
        <Text style={styles.texttitle}>Free Gold Delivery</Text>
        <Text style={styles.textSubtitle}>
          Get 24K 99.9% pure gold coins delivered at your home
        </Text>
        <View style={styles.rightSideView}>
          <View style={styles.viewRight}>
            <Text style={styles.text}>Limited time Offer</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LimitedOfferView;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
fontFamily :fonts.MontserratBold
  },
  card: {
    borderRadius: 12,
    backgroundColor: colors.lightapp,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  texttitle: {
    color: colors.white,
    fontFamily : fonts.MontserratMedium
  },
  textSubtitle: {
    fontSize: 16,
    fontFamily :fonts.MontserratBold,
    color: colors.white,
    marginVertical: 8,
  },

  rightSideView: {
    justifyContent: 'center',
  },
  viewLeftTop: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    width: '70%',
    backgroundColor: colors.tabActiveColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
