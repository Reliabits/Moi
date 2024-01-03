import {StyleSheet, Text, View,Pressable} from 'react-native';
import React from 'react';
import colors from '../assets/colors';
import fonts from '../theme/fonts';

const ButtonNoLine = (props) => {
  const {title,style} = props
  return (
    <Pressable
    onPress={() => {
      props?.onPress();
    }}
   style={[styles.rightSideView,style]}>
      <View style={styles.viewRight}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ButtonNoLine;

const styles = StyleSheet.create({
  text: {fontSize: 14, color: colors.black,fontFamily :fonts.MontserratBold},
  rightSideView: {
    width: '50%',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  viewLeftTop: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    width: 'auto',
    backgroundColor: colors.tabActiveColor,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 25 ,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
