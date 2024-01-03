import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import fonts from '../theme/fonts';

const InvestMore = ({title,style}) => {
  return (
    <View style={[styles.rightSideView,style]}>
      <View style={styles.viewRight}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default InvestMore;

const styles = StyleSheet.create({
  text: {fontSize: 18, color: colors.black,fontFamily :fonts.MontserratBold},
  rightSideView: {
    width: '100%',
    justifyContent: 'center',
  },
  viewLeftTop: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    width: 'auto',
    marginVertical:20,
    backgroundColor: colors.tabActiveColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10 ,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
