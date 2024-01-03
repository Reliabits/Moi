import {
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Dimensions,
} from 'react-native';
import React from 'react';
import colors from '../../../assets/colors';
import BackArrow from '../../../assets/svg/BackArrow.svg';
import Button from '../../../assets/svg/button.svg';
import MaxButton from '../../../assets/svg/MaxButton.svg';
import Ruppes from '../../../assets/svg/ruppes.svg';
import Info from '../../../assets/svg/info'
const {width} = Dimensions.get('window');

const ApplyLoanScreen = ({navigation}) => {
  const tab = (title, selected) => {
    return (
      <Pressable style={styles.rightSideView}>
        <View style={selected ? styles.viewRight : styles.viewRightUnselected}>
          <Text style={selected ? styles.text : styles.textunSelected}>
            {title}
          </Text>
        </View>
      </Pressable>
    );
  };

  const colatorator = () => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'column',
        }}>
        <View
          style={{
            paddingTop:10,
            flexDirection: 'row'
          }}>
          <Text style={styles.lbl}>Collateral Value</Text>
          <Info />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Text style={styles.inr}>Gold</Text>
          <Text style={styles.textmoney}>1,00,000gms</Text>
        </View>
        <Text style={styles.money}>RS1,00,000</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={colors.appBack} />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{margin: 16}}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  navigation.pop();
                }}>
                <BackArrow />
              </Pressable>
              <Text style={styles.lblTop}>Loans</Text>
            </View>
            <Text style={styles.textnodata}>
              Gold Portfolio : 100 grams ~ Rs. 4,00,000
            </Text>

            <View style={styles.tabBar}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{alignItems: 'center',flexDirection:'row'}}>
                    <Text style={styles.lbl}>Loan Amount</Text>
                    <Info />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Pressable style={[styles.btnmax]} onPress={() => {}}>
                      <MaxButton />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 20,
                    alignSelf: 'flex-end',
                  }}>
                  <View
                    style={{
                      alignContent: 'center',
                    }}>
                    <Ruppes />
                  </View>
                  <Text style={styles.inr}>INR</Text>
                  <Text style={styles.textmoney}>1,00,000</Text>
                </View>
              </View>
            </View>
            <View style={styles.tabBar}>
              {tab('14%', true)}
              {tab('13%')}
              {tab('12%')}
            </View>

            <Text style={styles.textnodata}>
              LTV (Loan-To-Value Option) 25%, 50%, 75%
            </Text>
            <View style={styles.tabBar}>{colatorator()}</View>
            <View style={styles.tabBar}>
              {tab('3months', true)}
              {tab('6months')}
              {tab('12months')}
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textnodata}>Monthly Interest @ 14% p.a.</Text>
            </View>

            <Pressable
              style={styles.btn}
              onPress={() => {
                navigation.navigate('LoanStart');
              }}>
              <Button />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ApplyLoanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBack,
    padding: 12,
  },
  TopView: {
    borderBottomLeftRadius: 24,
    borderBottomEndRadius: 24,
    justifyContent: 'center',
    alignContent: 'center',
  },
  RowOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 0.5,
    borderBottomColor: '#FFFFFF40',
    borderBottomEndRadius: 12,
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    color: colors.black,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  rightSideView: {
    justifyContent: 'center',
    paddingEnd: 5,
    width: width / 3.5,
  },
  viewLeftTop: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    backgroundColor: colors.tabActiveColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewRightUnselected: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textunSelected: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  IconRoundContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    minWidth: 150,
    padding: 10,
    borderColor: '#fff',
    backgroundColor: colors.tabActiveColor,
    elevation: 2,
    borderWidth: 0.9,
    paddingHorizontal: 12,
  },
  titleText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 8,
    color: colors.black,
  },
  textnodata: {
    color: colors.tabActiveColor,
    fontSize: 12,
    marginStart: 10,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  btn: {
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
    marginEnd: 10,
  },
  btnmax: {
    borderRadius: 10,
    marginTop: 10,
    // marginEnd: 10,
  },
  btntitle: {
    color: 'black',
    paddingVertical: 15,
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 40,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#2B2B2B',
    borderColor: '#2B2B2B',
    borderRadius: 20,
    borderWidth: 2,
    paddingEnd: 10,
    marginBottom: 10,
    marginTop: 15,
  },
  lbl: {
    color: colors.white,
    fontSize: 14,
    alignItems: 'center',
    marginStart: 20,
  },
  lblTop: {
    color: colors.white,
    fontSize: 14,
    alignItems: 'center',
    fontWeight: 'bold',
    marginStart: 20,
  },
  inr: {
    color: colors.tabActiveColor,
    fontSize: 20,
    marginStart: 10,
    fontWeight: 'bold',
  },
  textmoney: {
    color: colors.white,
    fontSize: 20,
    marginStart: 20,
    width: '70%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  money: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'right',
    fontWeight: 'bold',
    marginStart: 20,
    marginBottom: 15,
  },
});
