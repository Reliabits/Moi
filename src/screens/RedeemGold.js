import { View, Text, StyleSheet, TouchableOpacity, Button, Pressable, Image, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import TopLogo from '../assets/images/TopLogo.png'
import fonts from '../theme/fonts'
import goldcoin from '../assets/images/goldcoin.png'
import Entypo from 'react-native-vector-icons/Entypo'
import indiapost from '../assets/images/indiapost.png'
import AllindiaDelivery from '../assets/images/AllindiaDelivery.png'
import SecuredPackaging from '../assets/images/SecuredPackaging.png'
import insuredDelivery from '../assets/images/insuredDelivery.png'
import AugLogo from '../assets/images/AugLog.png'
import frame from '../assets/images/frame.png'
import frame2 from '../assets/images/frame2.png'
import indianStandard from '../assets/images/indianStandard.png'
import Augmont from '../assets/images/Augmont.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import apis from '../lib/apis'

const RedeemGold = () => {

    const [dropdown, setDropdown] = useState("")
    const [loader, setLoader] = useState(true)
    const [balance, setBalance] = useState([])


    useEffect(() => { 
        walletApi()
    }, [])

    function walletApi() {

        apis
            .walletApi()
            .then(res => {
                console.log("response", (res))

                setBalance(res.data.data)


                if (res.data.message) {
                    console.log("success", res.data.message)
                }
                else {
                    console.log("error", res.data.error)
                }
            }).catch(err => {
                console.log("err", err);
            })
            .finally(() => {
                setLoader(false)

            })


    }

  return (
    <View style={styles.mainView}>
          <ScrollView>
              <View style={styles.mainHeader}>
                  <Image source={TopLogo} />

                  <Text style={{color:"white", fontFamily:fonts.MontserratBold, fontSize:12, paddingStart:12}}>
                      Buy . Sell . Invest . Loan . <Text style={{color:'#ffef22'}}>Gold</Text>
                  </Text>
              </View>

              <View style={{ marginTop: 25, paddingHorizontal: 21, width: '100%' }}>
                  <Text style={{color:'#ffef22', fontFamily:fonts.MontserratBold, fontSize:14 }}>
                      Select a Gold coin
                  </Text>
                  
              </View>

              <View style={styles.goldinloaker}>
                  
                  <View style={{ width: '100%', paddingHorizontal: 7,  backgroundColor: '#F49C0B', height: 50, justifyContent:'space-between', paddingVertical:9, borderRadius:5 }}>
                      <Text style={{ color: 'white', fontFamily: fonts.MontserratSemiBold, fontSize: 10, }}>
                          Gold in Locker
                      </Text>
                      <Text style={{fontFamily:fonts.MontserratSemiBold, fontSize:10, color:'white'}}>
                          {loader ? (
                              <ActivityIndicator color="white" />
                          ) : ((balance?.gold_balance)?.toFixed(4))}
                          gm
                      </Text>
                      
                  </View>
                  
              </View>

              <View style={{ width: '100%', justifyContent: 'center', marginTop: 20, paddingHorizontal: 21 }}>
                  <Text style={{color:"#ffef22", fontFamily:fonts.MontserratBold, fontSize:14}}>
                      Other Available Coins
                  </Text>
                  <Text style={{color:'white', fontFamily:fonts.MontserratRegular, fontSize:10, paddingTop:6}}>
                      You can buy more Gold to unlock these coins
                  </Text>
                  
              </View>

              <View style={{ width: '100%', paddingHorizontal: 21, marginTop: 100, flexDirection:'row', justifyContent:'space-between'}}>
                  
                  <View style={{ width: '50%', justifyContent:"center", alignItems:'flex-start' }}>
                      
                      

                      <View style={{ height: 180, width: 154, backgroundColor: 'white', justifyContent:'center' , alignItems:'center', borderRadius:5}}>
                          <Image source={goldcoin} style={{ position: 'absolute', bottom: 120 }} />
                          <View style={{marginTop:40, justifyContent:"center", alignItems:'center'}}>
                          <Text style={{fontFamily:fonts.MontserratMedium, fontSize:12}}>
                              0.1 gm Gold Coin
                          </Text>
                          <Text style={{fontFamily:fonts.MontserratRegular, fontSize:8}}>
                              (24K . 99.99% Purity)
                          </Text>

                              <TouchableOpacity style={{ width: 123, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor:'#F49C0B', marginTop:10,borderRadius:40}}>
                              <Text style={{fontFamily:fonts.MontserratBold, fontSize:12}}>
                                  Buy More Gold
                              </Text>
                              </TouchableOpacity>
                              
                          </View>
                          
                      </View>
                      
                  </View>
                  




                  <View style={{ width: '50%', justifyContent: "center", alignItems: 'flex-end' }}>



                      <View style={{ height: 180, width: 154, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' , borderRadius:5}}>
                          <Image source={goldcoin} style={{ position: 'absolute', bottom: 120 }} />
                          <View style={{ marginTop: 40, justifyContent: "center", alignItems: 'center' }}>
                              <Text style={{ fontFamily: fonts.MontserratMedium, fontSize: 12 }}>
                                  0.1 gm Gold Coin
                              </Text>
                              <Text style={{ fontFamily: fonts.MontserratRegular, fontSize: 8 }}>
                                  (24K . 99.99% Purity)
                              </Text>

                              <TouchableOpacity style={{ width: 123, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F49C0B', marginTop: 10, borderRadius: 40 }}>
                                  <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12 }}>
                                      Buy More Gold
                                  </Text>
                              </TouchableOpacity>

                          </View>

                      </View>

                  </View>

              </View>

              
            {/* second row */}


              <View style={{ width: '100%', paddingHorizontal: 21, marginTop: 100, flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{ width: '50%', justifyContent: "center", alignItems: 'flex-start' }}>



                      <View style={{ height: 180, width: 154, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius:5 }}>
                          <Image source={goldcoin} style={{ position: 'absolute', bottom: 120 }} />
                          <View style={{ marginTop: 40, justifyContent: "center", alignItems: 'center' }}>
                              <Text style={{ fontFamily: fonts.MontserratMedium, fontSize: 12 }}>
                                  0.1 gm Gold Coin
                              </Text>
                              <Text style={{ fontFamily: fonts.MontserratRegular, fontSize: 8 }}>
                                  (24K . 99.99% Purity)
                              </Text>

                              <TouchableOpacity style={{ width: 123, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F49C0B', marginTop: 10, borderRadius: 40 }}>
                                  <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12 }}>
                                      Buy More Gold
                                  </Text>
                              </TouchableOpacity>

                          </View>

                      </View>

                  </View>





                  <View style={{ width: '50%', justifyContent: "center", alignItems: 'flex-end' }}>



                      <View style={{ height: 180, width: 154, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' , borderRadius:5}}>
                          <Image source={goldcoin} style={{ position: 'absolute', bottom: 120 }} />
                          <View style={{ marginTop: 40, justifyContent: "center", alignItems: 'center' }}>
                              <Text style={{ fontFamily: fonts.MontserratMedium, fontSize: 12 }}>
                                  0.1 gm Gold Coin
                              </Text>
                              <Text style={{ fontFamily: fonts.MontserratRegular, fontSize: 8 }}>
                                  (24K . 99.99% Purity)
                              </Text>

                              <TouchableOpacity style={{ width: 123, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F49C0B', marginTop: 10, borderRadius: 40 }}>
                                  <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12 }}>
                                      Buy More Gold
                                  </Text>
                              </TouchableOpacity>

                          </View>

                      </View>

                  </View>

              </View>




              {/* third row */}


              <View style={{ width: '100%', paddingHorizontal: 21, marginTop: 100, flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{ width: '50%', justifyContent: "center", alignItems: 'flex-start' }}>



                      <View style={{ height: 180, width: 154, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                          <Image source={goldcoin} style={{ position: 'absolute', bottom: 120 }} />
                          <View style={{ marginTop: 40, justifyContent: "center", alignItems: 'center' }}>
                              <Text style={{ fontFamily: fonts.MontserratMedium, fontSize: 12 }}>
                                  0.1 gm Gold Coin
                              </Text>
                              <Text style={{ fontFamily: fonts.MontserratRegular, fontSize: 8 }}>
                                  (24K . 99.99% Purity)
                              </Text>

                              <TouchableOpacity style={{ width: 123, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F49C0B', marginTop: 10, borderRadius: 40 }}>
                                  <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12 }}>
                                      Buy More Gold
                                  </Text>
                              </TouchableOpacity>

                          </View>

                      </View>

                  </View>





                  <View style={{ width: '50%', justifyContent: "center", alignItems: 'flex-end' }}>



                      <View style={{ height: 180, width: 154, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                          <Image source={goldcoin} style={{ position: 'absolute', bottom: 120 }} />
                          <View style={{ marginTop: 40, justifyContent: "center", alignItems: 'center' }}>
                              <Text style={{ fontFamily: fonts.MontserratMedium, fontSize: 12 }}>
                                  0.1 gm Gold Coin
                              </Text>
                              <Text style={{ fontFamily: fonts.MontserratRegular, fontSize: 8, color:'black' }}>
                                  (24K . 99.99% Purity)
                              </Text>

                              <TouchableOpacity style={{ width: 123, height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F49C0B', marginTop: 10, borderRadius: 40 }}>
                                  <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12 , color:'black'}}>
                                      Buy More Gold
                                  </Text>
                              </TouchableOpacity>

                          </View>

                      </View>

                  </View>

              </View>



              <View style={{ width: '100%', marginTop: 19, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 21, }}>
                  
                  <View style={{ width: '100%', paddingHorizontal: 21, height: 317, paddingVertical: 19, backgroundColor: 'white', borderRadius: 5, }}>
                      
                      <Text style={{fontFamily:fonts.MontserratBold, fontSize:16, color:'black' }}>
                          Delivery Information
                      </Text>

                      <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between', marginTop:26}}>
                          <Text style={{color:"black",fontFamily:fonts.MontserratRegular, fontSize:12}}>
                              <Entypo name="dot-single" />Delivery provided by india{'\n' }    post with free transit{'\n'}    insurance{'\n'}
                              <Entypo name="dot-single" />Delivery may take upto 4{'\n'}    weeks incase of covid-19
                          </Text>
                          <Image source={indiapost} />
                      </View>

                      <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between',  alignItems:'center', marginTop:26 }}>
                          <View>
                              
                              <Image source={insuredDelivery} />
                             
                              
                          </View>

                          <View>
                              
                              <Image source={AllindiaDelivery} />
                              
                          </View>

                          <View>
                              
                              <Image source={SecuredPackaging} />
                              
                          </View>
                      </View>
                  </View>  
              </View>


              <View style={{
                  marginTop:18, width:'100%', paddingHorizontal:21}}>
                  <Text style={{color:'#ffef22', fontFamily:fonts.MontserratBold, fontSize:14}}>
                      Product Details
                  </Text>

                  <View style={{flexDirection:'row',  alignItems:'center', marginTop:4}}>
                      <Image source={AugLogo} />

                      <Text style={{color:'white',fontFamily:fonts.MontserratBold, fontSize:12, paddingStart:10}}>
                          Augmont Goldtech Private Limited
                      </Text>
                      
                  </View>


                  <Text style={{color:'white', fontFamily:fonts.MontserratRegular, fontSize:10, paddingTop:10}}>
                      To provide you pure and top - quality bullion, Moi has partnered with Augmont Goldtech Private Limited - an integrated precious metals management company. Bullion India is one of the products launched by Augmont, offering an oppurtunity to buy gold at flexible prices. 
                  </Text>
                  
                  <Image source={frame} style={{ width: '100%', marginTop: 29 }} />
                  

                  <View style={{ width: '100%',marginTop:18 }}>
                      
                      <Text style={{color:'#ffef22', fontFamily:fonts.MontserratBold, fontSize:14}}>
                          Delivery
                      </Text>
                      <View >

                          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 23 }}>
                          <Text style={{fontFamily:fonts.MontserratBold, fontSize:12, color:'white'}}>
                              What are the making, delivery charges?{ '\n'} Do you pay for transit insurance?
                          </Text>

                              <TouchableOpacity onPress={() => {
                                  if (dropdown == "one") {
                                      // setSelectedColor("one");
                                      setDropdown(null)
                                  } else {
                                      setDropdown("one");
                                  }
                              }} style={{justifyContent:'center', alignItems:'center', }}>
                                  
                           
                              { dropdown == "one" ?  
                                  
                             <AntDesign name="up" color="white" size={15} />: 
                                  <AntDesign name="down" color="white" size={15} /> 
                                  
                                  }
                                  
                              </TouchableOpacity>
                          </View>

                          {
                              dropdown == "one" &&
                              <View style={{ width: "100%", paddingHorizontal: 6, paddingVertical: 13, marginTop: 18, backgroundColor: '#2a2a2a',  }}>
                                      
                                      <Text style={{
                                          color: 'white', fontFamily: fonts.MontserratRegular, fontSize: 10, 
                                          lineHeight: 17, }}>
                                          The amount you need to pay for covering your digital Gold into Gold coins varies on the basis of the weight of the gold coin. The prices mentioned below include making chargers, delivery chargers, GST{ '\n'}
                                          Transit insurance{ '\n'}
                                          0.1 gm Gold coin  ₹200{ '\n'}
                                          0.5 gm Gold coin - ₹300,{'\n'}
                                          1 gm Gold coin - ₹350{'\n'}
                                          2 gm Gold coin - ₹400{'\n'}
                                          5 gm Gold coin - ₹500{'\n'}
                                          8 gm Gold coin - ₹650{'\n'}
                                          10 gm Gold coin - ₹800{'\n'}
                                          20 gm Gold coin - ₹1100{'\n'}
                                          50 gm Gold coin - ₹2100{'\n'}
                                      </Text>


                              </View>



                          }

                          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',marginTop:23 }}>
                              <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12, color: 'white' }}>
                                  How to convert Digital Gold to a physical{'\n' } Gold Coin for delivery?
                              </Text>

                              <TouchableOpacity onPress={() => {
                                  if (dropdown == "two") {
                                      // setSelectedColor("one");
                                      setDropdown(null)
                                  } else {
                                      setDropdown("two");
                                  }
                              }} style={{ justifyContent: 'center', alignItems: 'center' }} >
                                  {dropdown =="two" ?
                                      
                                  <AntDesign name="up" color="white" size={15} />:
                                  <AntDesign name="down" color="white" size={15} />
                                  }
                                  
                              </TouchableOpacity>

                              

                          </View>

                          {
                              dropdown == "two" &&
                              <View style={{ width: "100%", paddingHorizontal: 6, paddingVertical: 13, marginTop: 18, backgroundColor: '#2a2a2a', }}>

                                  <Text style={{
                                      color: 'white', fontFamily: fonts.MontserratRegular, fontSize: 10,
                                      lineHeight: 17,
                                  }}>
                                          To convert you digital Gold savings into a physical  Gold coin, go to the portfolio section in the app choose deliver Gold then choose the coin weight that you desire. The minimum weight of the coins  available is 0.1 gm and therefore you would need balance is more than that, you can directly go to and get the delivery to your address. If your  locker balance  is less than that, you will need to add con of your desired weight. All coins are 24k 99.9% purity guaranteed by Bureau of Indian Standards (BIS)
                                  </Text>


                              </View>



                          }


                          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 23 }}>
                              <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12, color: 'white' }}>
                                  Is my Gold insured
                              </Text>

                              <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={() => {
                                  if (dropdown == "three") {
                                      // setSelectedColor("one");
                                      setDropdown(null)
                                  } else {
                                      setDropdown("three");
                                  }
                              }}>
                                  {
                                      dropdown == "three" ?
                                          <AntDesign
                                              name="up" color="white" size={15} />:
                                          <AntDesign
                                              name="down" color="white" size={15} />
                                          
                                  }
                              </TouchableOpacity>

                              {/* <AntDesign 
                               name="down" color="white" size={15} /> */}

                          </View>

                          {
                              dropdown == "three" &&
                              <View style={{ width: "100%", paddingHorizontal: 6, paddingVertical: 13, marginTop: 18, backgroundColor: '#2a2a2a', }}>

                                  <Text style={{
                                      color: 'white', fontFamily: fonts.MontserratRegular, fontSize: 10,
                                      lineHeight: 17,
                                  }}>
                                          After you make a purchase with Moi, we will place an order with our digital gold partner - Augmont. Augmont further partners with IDBI Trusteeship to manage and insure the gold vaults for Moi. Even when the physical gold that you’ve ordered is out for delivery, it is insured. 
                                  </Text>


                              </View>



                          }


                          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 23 }}>
                              <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 12, color: 'white' }}>
                                  Can I track where my delivery is?
                              </Text>

                              <AntDesign name="down" color="white" size={15} />

                          </View>

                          
                          
                      </View>
                      
                      
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: "center", alignItems: 'center' , marginTop:23}}>
                          <Text style={{color:'#ffef22', fontFamily:fonts.MontserratBold, fontSize:14, textDecorationLine:'underline'}}>
                              View more FAQ’S 
                          </Text>
                          <AntDesign  style={{marginStart:14}} name="right" size={15} color="#ffef22" />
                          
                      </View>
                 

                    

                      <View style={{marginTop:27}}>
                          <Text style={{color:'white', fontFamily:fonts.MontserratBold, fontSize:14}}>
                              All investments made via MOI are 100% {'\n'}Transparent and secure
                          </Text>
                      </View>

                      <View style={{width:'100%', justifyContent:'center', alignItems:'center', backgroundColor:'white', height:112, marginTop:18, borderRadius:5}}>
                          <Image source={frame2} />
                      </View>


                      <View style={{width:'100%', justifyContent:'center', alignItems:'center', marginTop:24}}>
                          <Text style={{color:'#ffef22', fontFamily:fonts.MontserratBold, fontSize:14}}>
                              Bringing you the trust and support of
                          </Text>
                      </View>

                      <View style={{ marginTop: 24, justifyContent: 'space-evenly', alignItems: 'center', width: '100%' , flexDirection:'row'}}>
                          
                          <Image source={indianStandard} />
                          <Image source={Augmont} style={{width:191, height:35}} />
                          
                      </View>
                  </View>
              </View>







      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    goldinloaker: {
        width: '100%',
        paddingHorizontal: 21,
       marginTop:20
    },

    mainHeader: {
        width: '100%',
        marginTop: 36,
        paddingHorizontal:21,
        flexDirection: 'row',
        // justifyContent:'space-between',
        alignItems: 'center',
    },
    mainView: {
        flex: 1,
        backgroundColor:'black'
        // justifyContent: 'center',
        // alignItems:'center'
    }

})
export default RedeemGold