import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import fonts from '../../theme/fonts'
import { HStack, Checkbox, Modal,  } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import Gif from '../common/Gif'


const DetailUser = () => {
  const [showModal, setShowModal] = useState(false)

  const navigation = useNavigation();
  const [refral, setRefral] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: 37, width: "100%", paddingHorizontal: 33, flexDirection: "row", justifyContent: "flex-end", }}>
        <Text style={{ fontFamily: fonts.MontserratRegular, color: "#999999", fontSize: 16 }}>
          Step 1/2
        </Text>
      </View>

      <View style={{ marginTop: 37, width: '100%', paddingHorizontal: 34, }}>
        
        <Text style={{fontFamily:fonts.MontserratRegular, fontSize:32, color:'#000000'}}>
          Fill in your details
        </Text>

        <View style={{ width: '100%', marginTop: 50, }}>
          
          <TextInput
            keyboardType={'phone-pad'}
            placeholder='Full Name'
            // onChangeText={(val) => {
            //   setPhone(val);
            //   console.log("phone number", val)
            // }}
            style={{ width: "100%",paddingHorizontal:10, borderRadius: 5, borderWidth: 1, borderColor: '#666666' }} />
          
          <TextInput
            keyboardType={'phone-pad'}
            placeholder='DOB(DD/MM/YYYY)'
            // onChangeText={(val) => {
            //   setPhone(val);
            //   console.log("phone number", val)
            // }}
            style={{ width: "100%", paddingHorizontal:10,marginTop:20, borderRadius: 5, borderWidth: 1, borderColor: '#666666' }} />
          
          <TextInput
            keyboardType={'phone-pad'}
            placeholder='PAN Number'
            // onChangeText={(val) => {
            //   setPhone(val);
            //   console.log("phone number", val)
            // }}
            style={{ width: "100%", paddingHorizontal:10,marginTop:20, borderRadius: 5, borderWidth: 1, borderColor: '#666666' }} />
        </View>

        <HStack style={{marginTop:20}} space={6}>
          <Checkbox  value={refral} onChange={(value)=> {setRefral(value)}} colorScheme="danger" shadow={2} accessibilityLabel="This is a dummy checkbox" defaultIsChecked={false}>
            <Text style={{ fontFamily: fonts.MontserratRegular, fontSize: 16, color: "#666666" }}>I have a referral code</Text>
          </Checkbox>
        </HStack>

        {
          refral && (
          <TextInput
            keyboardType={'phone-pad'}
              placeholder='Type your code'
            // onChangeText={(val) => {
            //   setPhone(val);
            //   console.log("phone number", val)
            // }}
            style={{ width: "100%", marginTop:20,paddingHorizontal:10, borderRadius: 5, borderWidth: 1, borderColor: '#666666' }} />
       ) }

       

      </View>

      <View>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />

            <Modal.Body>

              <View style={{ height: 200, width: "100%", justifyContent: 'center', alignItems: 'center' }}>


                {/* <ActivityIndicator size="large"  /> */}
                <Gif />
                {/* <Image style={{width:66, height:69.96}} source={Verifying} /> */}
                <Text style={{ fontFamily: fonts.MontserratRegular, fontSize: 32, color: '#000000' }}>Creating Profile</Text>

              </View>
            </Modal.Body>

          </Modal.Content>
        </Modal>
      </View>

      <View style={{ flex:1 ,  justifyContent: "flex-end", alignItems: 'center',marginBottom:36 }}>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          //   onPress={() => { verify(); verifyOTP() }}
          style={{ width: 300, justifyContent: "center", alignItems: 'center', backgroundColor: "#C34104", borderRadius: 40, height: 58 }}>
          {/* {loader ? <ActivityIndicator color={"white"} /> : */}
          <Text style={{ fontFamily: fonts.MontserratBold, fontSize: 24, color: "#ffffff" }}>
           Next
          </Text>
          {/* } */}

        </TouchableOpacity>
      </View>

     

    </SafeAreaView>
  )
}

export default DetailUser