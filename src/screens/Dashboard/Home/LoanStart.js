import {
    StyleSheet,
    StatusBar,
    ScrollView,
    View,
    Text,
    SafeAreaView,
    Pressable,
    Image,
    TouchableOpacity
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
import amico from '../../../assets/images/amico.png'

const LoanStart = ({ navigation }) => {
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
                        <View style={{ width: '55%', justifyContent: 'center', paddingStart: 10 }}>
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

                <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.TextView}>

                    <Text style={{ color: 'white', fontWeight:'400', fontSize:18 }}> Dear <Text style={{fontWeight:'700'}}>Kiran</Text> </Text>
                    <Text style={{color:'white', fontWeight:'400', fontSize:18}}>
                        Thank you for applying.
                    </Text>
                    <Text style={{ color: 'white', fontWieght:'400', fontSize:18 }}>your<Text style={{fontWeight:'700', fontSize:18 , color:'#FFEF22'}}> Gold Loan</Text>  will be approved</Text>
                    <Text style={{ color: 'white', fontWieght: '400', fontSize: 18 }}>shortly ...</Text>


                </View>

                <View style={styles.imgView}>
                    <Image source={amico} />
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity onPress={()=> {navigation.navigate("Loan")}} style={styles.button}>
                        <Text style={{fontWeight:'700', fontSize:16, color:'#000000'}}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default LoanStart;

const styles = StyleSheet.create({
    button: {
        width: 127,
        height: 44, 
        backgroundColor: '#FFEF22',
        justifyContent: 'center', 
        alignItems:'center', borderRadius:16
        
        
    },

    buttonView: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:91,

    },
    imgView: {
        marginTop:61,
        width: '100%', 
        justifyContent: 'center', 
        alignItems:'center'

    },

    TextView: {
        marginTop:39,
        width: '100%',
        justifyContent: 'center', alignItems: 'center',
        

    },
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
