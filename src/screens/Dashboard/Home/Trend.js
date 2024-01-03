import { View, Text, ScrollView , StyleSheet, TouchableOpacity, Image, } from 'react-native'
import React, {useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import fonts from '../../../theme/fonts'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import moi from '../../../assets/images/MOIcolorcoin2.png'
import Info from '../../../assets/svg/info.svg'


const Trend = () => {

  const [selectedColor, setSelectedColor] = useState("")

  return (
    <View style={styles.mainView}>
      <ScrollView>
        <View style={{width:'100%', paddingHorizontal:21, height:60, marginTop:34, flexDirection:'row', }}>
          <AntDesign name="arrowleft" size={20} color="yellow" />

          <Text style={{color:'white', fontSize:16, fontFamily:fonts.MontserratBold,paddingStart:126}}>
            Gold Buy price
          </Text>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 21, height: 60, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
          <Text style={{color:'#ffef22', fontSize:16, fontFamily:fonts.MontserratBold, }}>
            34.81%
            </Text>

            <Text style={{color:"white", fontFamily:fonts.MontserratMedium, fontSize:7 }}>
              5Y Change(%)
            </Text>
          </View>

          <Text style={{ color: '#ffef22', fontSize: 16, fontFamily: fonts.MontserratBold }}>
            Rs 5193.56/gm
   </Text>
        </View>


        <View style={{ width: '100%', paddingHorizontal: 21, marginTop: 20 }}>
          
          <View style={{ width: "100%", justifyContent: "center", alignItems: 'center' }}>
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={{
                
                datasets: [
                  {
                    data: [

                    

                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                    ]
                  }
                ]
              }}
              width={373} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View> 

        </View>

        <View style={{ width: '100%',  paddingHorizontal: 21, marginTop: 20, }}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop: 20, backgroundColor: '#2A2A2A', borderRadius: 10, }}>




          <View>
            <TouchableOpacity onPress={() => {
              if (selectedColor == "one") {
                // setSelectedColor("one");
                setSelectedColor(null)
              } else {
                setSelectedColor("one");
              }
            }} style={{ width: 67, height: 36, backgroundColor: selectedColor == "one" ? "yellow" : '#2A2A2A', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

              <Text style={{ color: selectedColor == "one" ? "black" : 'white' }}>
                20%
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => {
              if (selectedColor == "two") {
                // setSelectedColor("one");
                setSelectedColor(null)
              } else {
                setSelectedColor("two");
              }
            }} style={{ width: 67, height: 36, backgroundColor: selectedColor == "two" ? "yellow" : '#2A2A2A', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
              <Text style={{ color: selectedColor == "two" ? "black" : 'white' }}>
                50%
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => {
              if (selectedColor == "three") {
                // setSelectedColor("one");
                setSelectedColor(null)
              } else {
                setSelectedColor("three");
              }
            }} style={{ width: 67, height: 36, backgroundColor: selectedColor == "three" ? "yellow" : '#2A2A2A', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
              <Text style={{ color: selectedColor == "three" ? "black" : 'white' }}>
                75%
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => {
              if (selectedColor == "four") {
                // setSelectedColor("one");
                setSelectedColor(null)
              } else {
                setSelectedColor("four");
              }
            }} style={{ width: 67, height: 36, backgroundColor: selectedColor == "four" ? 'yellow' : "#2A2A2A", justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
              <Text style={{ color: selectedColor == "four" ? "black" : 'white' }}>
                100%
              </Text>
            </TouchableOpacity>
            </View>
          </View>


        </View>

        <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal:21, marginTop:36 }}>
          
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color:'#ffef22', fontFamily:fonts.MontserratBold, fontSize:12}}>
              Rs 10.00
            </Text>

            <Text style={{color:'white', fontFamily:fonts.MontserratMedium, fontSize:6}}>
              Min Amount
            </Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratBold, fontSize: 12 }}>
              24K
            </Text>

            <Text style={{ color: 'white', fontFamily: fonts.MontserratMedium, fontSize: 6 ,}}>
              Karat
            </Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#ffef22', fontFamily: fonts.MontserratBold, fontSize: 12 }}>
              99.95%
            </Text>
            <Text style={{ color: 'white', fontFamily: fonts.MontserratMedium, fontSize: 6 , }}>
              Purity
            </Text>
          </View>

        </View>


        <View style={{ width: '100%', height: 55, 
          paddingHorizontal: 21, marginTop: 36
        }}>
          
          <View style={{ width: '100%', paddingHorizontal: 21, backgroundColor: "#2a2a2a", height: 55, borderRadius: 10, flexDirection:'row' }}>
            <View style={{width:'60%',justifyContent:'center',  }}>

              <View style={{flexDirection:'row',}}>

              <Image style={{height:12.31, width:12.31}} source={moi} />

              <Text style={{color:'white', fontFamily:fonts.MontserratBold, fontSize:10, paddingStart:10}}>
                Gold in locker
                </Text>
                
              </View>

              <Text style={{color:'white', fontFamily:fonts.MontserratMedium, fontSize:8, paddingTop:5}}>
                24k | 99.95% Pure Gold
              </Text>


            </View>

            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
              <Text style={{ color: 'white', fontFamily: fonts.MontserratBold, fontSize: 10 , }}>
                0.0000 gm
              </Text>

            <Info style={{marginStart:5}} />
            </View>

          </View>
          


        </View>


     
      
        
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "black",
    flex: 1,
    
  }
})

export default Trend