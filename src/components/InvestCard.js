import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Spare from '../assets/svg/spare.svg';
import Support from '../assets/svg/support.svg';

import Secure from '../assets/svg/secure.svg';

import colors from '../assets/colors';
import fonts from '../theme/fonts';
const InvestCard = ({title,icon}) => {
  return (
    <View style={styles.card}>
      {icon == 'spare' ? <Spare /> : icon == 'support' ? <Support /> : <Secure />}
      <Text style={styles.text}> {title}</Text>
    </View>
  );
};

export default InvestCard;

const styles = StyleSheet.create({
  card: {
    margin: 4,
    height: 100,
    width: 100,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 0.9,
    borderColor: colors.lightwhite,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    fontFamily:fonts.MontserratMedium,
    fontSize: 10,
    paddingTop:10
  },
});
