import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import fonts from "../theme/fonts";
import colors from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import ProfileInfoEdit from "../components/ProfileInfoEdit";
import apis from "../lib/apis";
import { LOADER, PROFILE } from "../Redux/Constant";
const Profile = ({ props }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState([])
  useEffect(() => {
   getProfile()
  }, [])
  


  const dispatch = useDispatch();


  const dataRedux = useSelector((state) => state);
  console.log("dataRedux", dataRedux.PROFILE);

  useEffect(() => {
    getAddress();
  },[])

  function getAddress() {

    apis
      .getAddress()
      .then(res => {
        console.log("response", (res))




        if (res.data.message) {
          console.log("success", res.data.message)
          setUser(res?.data?.user?.addresses[0])
          console.log("set user", res.data.user.addresses[0])
        }
        else {
          console.log("error", res.data.error)
        }
      }).catch(err => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false)

      })


  }

  async function saveProfile(payload) {
    dispatch({
      type: LOADER,
      payload: true,
    });
    apis
      .udpateProfile(payload)
      .then((res) => {
        console.log("update responce :",res)
        if (res.status == 200) {
         
          alert(res.data.message);
          getProfile()
        }
       
      })
      .catch((err) => {
        console.log("err", err);
        alert(err);
        dispatch({
          type: LOADER,
          payload: false,
        });
      })
      .finally(() => {
        dispatch({
          type: LOADER,
          payload: false,
        });
      });
  }

  function getProfile() {
    apis
      .getProfile()
      .then((res) => {
        console.log("res", res);
        if (res.status == 200) {
          dispatch({
            type : PROFILE,
            payload : res.data.user
          })
        }
        dispatch({
          type: LOADER,
          payload: false,
        });
      })
      .catch((err) => {
        console.log("err", err);
        alert(err);
        dispatch({
          type: LOADER,
          payload: false,
        });
      })
      .finally(() => {
        dispatch({
          type: LOADER,
          payload: false,
        });
      });
    }


  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.prfl}>
          <View style={styles.arw}>
            <AntDesign name={"edit"} color="black" size={20} />
          </View>
        </View>

        <ProfileInfoEdit
            // disabled={dataRedux.isKycVerified==false}
         onPress={(name) => {
         
            const str = dataRedux?.PROFILE?.gender;
            const genderCateg = str.charAt(0).toUpperCase() + str.slice(1);
            saveProfile({
              name: name,
              age : dataRedux?.PROFILE?.age,
              gender :genderCateg
            });
        }
        }
          ModalTitle={"What's your name?"}
          label={"Name"}
          value={dataRedux?.PROFILE?.name}
        />

        <Pressable
        //  onPress={() =>  alert('In Progress')}
          style={[styles.row, styles.underline, styles.margintop]}>
          <Text style={styles.labelbg}>Phone</Text>
          <Text style={styles.label}>{dataRedux?.PROFILE?.phone}</Text>
        </Pressable>

        <ProfileInfoEdit
          onPress={(val) => {
            const str = dataRedux?.PROFILE?.gender;
const genderCateg = str.charAt(0).toUpperCase() + str.slice(1);
            saveProfile({
              name: dataRedux?.PROFILE?.name,
              age : val,
              gender :genderCateg
            });
          }}
          ModalTitle={"What's your age?"}
          label={"Age"}
          value={dataRedux?.PROFILE?.age}
        />

        <ProfileInfoEdit
          onPress={(val) => {
            saveProfile({
              name: dataRedux?.PROFILE?.name,
              age : dataRedux?.PROFILE?.age,
              gender :val
            });
          }}
          radio={true}
          ModalTitle={"What do you identity as?"}
          label={"Gender"}
          value={dataRedux?.PROFILE?.gender}
        />

     

        <Pressable
           onPress={() => { 
           navigation.navigate("Address")}}
          style={[styles.row, styles.underline, styles.margintop]}
        >
          <Text style={styles.labelbg}>Saved Addresses</Text>
          <View style={styles.row}>
            <Text style={styles.labelRight}>{user?.address}</Text>
            <Entypo
              name="chevron-right"
              color={"white"}
              size={25}
              style={{ alignSelf: "center" }}
            />
          </View>
        </Pressable>
{/* 
        <Pressable
          onPress={() => {
            navigation.navigate("Pancard");
          }}
          style={[styles.row, styles.underline, styles.margintop]}
        >
          <Text style={styles.labelbg}>Identity Verification</Text>
          <View style={styles.row}>
            <Text style={styles.labelRight}>Complete Now</Text>
            <Entypo
              name="chevron-right"
              color={"white"}
              size={25}
              style={{ alignSelf: "center" }}
            />
          </View>
        </Pressable> */}

        <Pressable
          onPress={() => {
            !dataRedux.PROFILE.isKycVerified &&    navigation.navigate("Kyc");
          }}
          style={[styles.row, styles.underline, styles.marginvertical]}
        >
          <Text style={styles.labelbg}>Identity Verification</Text>
          <View style={styles.row}>
            <Text style={styles.labelRight}>{dataRedux.PROFILE.isKycVerified ? <> <AntDesign name={"check"} color="green" size={23} />Verified</>:  "Complete now"}</Text>
            <Entypo
              name="chevron-right"
              color={"white"}
              size={25}
              style={{ alignSelf: "center" }}
            />
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  prfl: {
    backgroundColor: colors.bg,
    height: 150,
    width: 150,
    borderRadius: 150,
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontFamily: fonts.MontserratBold,
    fontSize: 15,
    alignSelf: "center",
    width: "40%",
  },
  labelbg: {
    color: colors.lightwhite,
    fontFamily: fonts.MontserratBold,
    fontSize: 15,
    alignSelf: "center",
    width: "40%",
  },
  padding: {
    paddingStart: 20,
  },
  arw: {
    backgroundColor: colors.tabActiveColor,
    position: "absolute",
    padding: 10,
    borderRadius: 20,
    bottom: 0,
    right: 0,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
  labelRight: {
    color: "white",
    paddingStart: 20,
    fontFamily: fonts.MontserratRegular,
    fontSize: 15,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  margintop: {
    marginTop: 30,
   
  },
  marginvertical: {
    
    marginTop: 30,
    marginBottom:100
  },
  mainView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
});

export default Profile;
