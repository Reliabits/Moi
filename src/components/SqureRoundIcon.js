import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppLogo from '../assets/svg/AppLogo.svg';
const SqureRoundIcon = () => {
  return (
    <View style={styles.IconRoundContainer}>
      <AppLogo style={{alignSelf: 'center'}} />
    </View>
  );
};

export default SqureRoundIcon;
const styles = StyleSheet.create({
  IconRoundContainer: {
    height: 46,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginLeft: -30,
    marginTop: 10,
  },
});
