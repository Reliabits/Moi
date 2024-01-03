import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InvestCard from './InvestCard';
import ButtonNoLine from './ButtonNoLine';
import ButtonMOI from './ButtonMOI';
import ButtonWithOutLine from './ButtonWithOutLine';
import colors from '../assets/colors';
import fonts from '../theme/fonts';

const SetUpInvestCard = () => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.text}>Setup Auto-Invest</Text>
      </View>

      <View style={styles.row}>
        <InvestCard icon='spare' title={'Spare change auto-invested'} />
        <InvestCard icon='support' title={'Supports 13+banks'} />
        <InvestCard icon='secure' title={'100% secure'} />
      </View>

      <View style={{width: '100%'}}>
        <View style={styles.row}>
          <ButtonMOI title={'How it works'} />
          <ButtonWithOutLine title={'Setup'} />
        </View>
      </View>
    </View>
  );
};

export default SetUpInvestCard;

const styles = StyleSheet.create({
  text: {color: colors.white, fontFamily : fonts.MontserratBold},
  card: {
    padding: 8,
    paddingVertical: 14,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightapp,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
});
