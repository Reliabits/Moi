import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import fonts from "../../theme/fonts";

const Success = (props) => {
  return (
    <View style={styles.mainView}>
      <Text
        style={{
          color: "white",
          fontFamily: fonts.MontserratBold,
          fontSize: 30,
        }}
      >
        Congrates {props.route.params?.name}
      </Text>
      <Text
        style={{
          color: "white",
          fontFamily: fonts.MontserratRegular,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        {" "}
        you are all set to start your saving journey
      </Text>

      <TouchableOpacity
        style={{
          width: "90%",
          height: 50,
          marginTop: 200,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "yellow",
        }}
        onPress={() => {
          props.navigation.navigate('HomeScreen')
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 18,
            fontFamily: fonts.MontserratBold,
          }}
        >
          Go To Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Success;
