import {
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image
} from 'react-native';
import React from 'react';
import SqureRoundIcon from '../../../components/SqureRoundIcon';
import colors from '../../../assets/colors';
import Notification from '../../../assets/svg/Grey_notification.svg';
import NoLoan from '../../../assets/svg/noloan.svg';
import ApplyLoan from '../../../assets/svg/ApplyLoan.svg';
import Calculator from '../../../assets/svg/calculator.svg';
import AppLogo from '../../../assets/svg/AppLogo.svg';
import TopLogo from '../../../assets/images/TopLogo.png'
import inrLogo from '../../../assets/images/inrLogo.png'
import fonts from '../../../theme/fonts';
import commingSoon from '../../../assets/images/Gold2.png'
// commingsoon.png
const Loans = ({navigation}) => {
  const IconRound = () => {
    return (
      <View>
        <Notification />
      </View>
    );
  };
  // const NoloanData = () => {
  //   return <NoLoan />;
  // };
  const ApplyButton = () => {
    return (
      <Pressable
        style={styles.IconRoundContainer}
        onPress={() => {
          navigation.navigate('ApplyLoanScreen');
        }}>
        <ApplyLoan />
        <Text style={styles.titleText}>{'Apply for a loan'}</Text>
      </Pressable>
    );
  };
  const CalculatorButton = () => {
    return (
      <Pressable style={[styles.IconRoundContainer]}>
        <Calculator />
        <Text style={styles.titleText}>{'Calculator'}</Text>
      </Pressable>
    );
  };

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

  return (
    <>
      <StatusBar backgroundColor={colors.appBack} />
      <SafeAreaView style={styles.container}>
        <View style={styles.TopView}>
          <View style={styles.RowOne}>
            <View style={{width: '55%', justifyContent:'center', paddingStart: 10}}>
              {/* <SqureRoundIcon /> */}

             <Image source={TopLogo} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <IconRound />
            </View>
          </View>
        </View>
        <ScrollView style={{margin: 16}}>
          <View style={{flex: 1}}>
            {/* <Text
              style={{
                alignSelf: 'center',
                color: colors.tabInActivColor,
                fontWeight: 'bold',
                fontSize: 18,
                margin: 25,
              }}>
              Loans Overview
            </Text> */}
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}> */}
              {/* <ApplyButton />
              <CalculatorButton /> */}
            {/* </View> */}
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{flexDirection: 'row', marginTop: 30, marginBottom: 15}}>
                {tab('All', true)}
                {tab('Active')}
                {tab('Pending')}
                {tab('Closed')}
                {tab('Refinanced')}
              </View>
            </ScrollView> */}

            {/* <View style={{width:'100%', justifyContent:'center',borderColor:"white", alignItems:'center', height:"100%"}}> */}
            <Image source={commingSoon} style={{width:'100%',height:500}}/>
              {/* <Text style={{ color: 'white', fontSize:20, fontFamily:fonts.MontserratBold }}>
                
                loan is coming soon

              </Text> */}
            {/* </View> */}


            {/* <View style={{ width: '100%', alignItems:'center', justifyContent:'center', marginTop:20 }}>
              
              <View style={{ width: 312, height: 124, backgroundColor: '#2B2B2B', borderRadius:25 }}>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop:10 , paddingHorizontal:15}}>
                  
                  <Text style={{color:'white', fontWeight:'400', fontSize:18}}>Loan Amount</Text>
                  <Text style={{ color: 'white', fontWeight:'400', fontSize:12 }}>Interest <Text style={{fontWeight:'700', fontSize:12}}>12%</Text>  p.a.
                  </Text>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 3 }}>
                  <View style={{flexDirection:'row', alignItems:'center', }}>
                  <Image source={inrLogo}  />
                  <Text style={{ color: 'white', fontWeight:'700', fontSize:18, paddingStart:10 }}>
                    
                    3,00,000

                    </Text>
                  </View>
                  <Text style={{ color: 'white', fontWeight: '400', fontSize: 12 }}>Collateral <Text style={{fontWeight:'700'}}>75%</Text>
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' , paddingHorizontal:20, paddingTop:20}}>
                  <Text style={{color:'white', fontWeight:'400', fontSize:16}}>Loan Status : </Text>

                  <Text style={{color:'#DD8403', fontWeight:'700', fontSize:17}}>
                    Pending
                  </Text>

                </View>

              </View>


              
           </View> */}

            {/* <View
              style={{
                alignSelf: 'center',
                marginTop: '30%',
              }}>
              <NoLoan />
            </View> */}

            {/* <Text style={styles.textnodata}>
              Sorry, there are no loans for selected type of loan
            </Text> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Loans;

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
    borderWidth: 1,
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  rightSideView: {
    justifyContent: 'center',
    marginEnd: 4,
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
    color: colors.tabActiveColor,
    fontSize: 12,
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
    color : 'black'
  },
  subTitleText: {
    fontSize: 8,
    color: colors.black,
  },
  textnodata: {
    color: colors.tabActiveColor,
    fontSize: 16,
    alignSelf: 'center',
    margin: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
