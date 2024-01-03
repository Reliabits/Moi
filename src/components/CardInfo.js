import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppLogo from '../assets/svg/AppLogo.svg';
import colors from '../assets/colors';
const CardInfo = ({title, subTitle, onClicked}) => {
  return (
    <TouchableOpacity onPress={onClicked} style={styles.IconRoundContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subTitleText}>{subTitle}</Text>
    </TouchableOpacity>
  );
};

export default CardInfo;
const styles = StyleSheet.create({
  IconRoundContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 6,
    borderColor:colors.tabActiveColor,
    elevation: 2,
    borderWidth: 0.9,
    padding: 10,
  },
  titleText: {
    fontSize: 10,
    color : colors.tabActiveColor
  },
  subTitleText: {
    fontSize: 12,
    color: colors.white,
  },
});
