import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import fonts from "../theme/fonts";
import colors from "../assets/colors";
import { Input, Modal } from "native-base";
import InvestMore from "./InvestMore";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileInfoEdit = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [inputValue, setinputValue] = useState(props.value);
  
  const dataRedux = useSelector((state) => state);

  function renderModal() {
    return (
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        safeAreaTop={true}
        style={{ backgroundColor: colors.offwhite }}
      >
        <Modal.Content
          width={"85%"}
          height={"auto"}
          borderRadius={30}
          backgroundColor={colors.bg}
          style={{ padding: 20, paddingTop: 50, alignSelf: "center" }}
        >
          <Text style={styles.lbel}>{props.ModalTitle}</Text>
          <View>
            <View
              style={{
                marginLeft: 20,
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              {props?.radio ? (
                <View>
                  <Pressable
                    style={styles.radio}
                    onPress={() => {
                      setinputValue("male");
                    }}
                  >
                    <Fontisto
                      name={
                        inputValue == "male"
                          ? "radio-btn-active"
                          : "radio-btn-passive"
                      }
                      size={20}
                      color="black"
                      style={{ paddingLeft: 10 }}
                    />

                    <Text
                      style={{
                        color: "black",
                        fontFamily: fonts.MontserratBold,
                        paddingLeft: 10,
                      }}
                    >
                      Male
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.radio}
                    onPress={() => {
                      setinputValue("female");
                    }}
                  >
                    <Fontisto
                      name={
                        inputValue == "female"
                          ? "radio-btn-active"
                          : "radio-btn-passive"
                      }
                      size={20}
                      color="black"
                      style={{ paddingLeft: 10 }}
                    />

                    <Text
                      style={{
                        color: "black",
                        fontFamily: fonts.MontserratBold,
                        paddingLeft: 10,
                      }}
                    >
                      Female
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.radio}
                    onPress={() => {
                      setinputValue("other");
                    }}
                  >
                    <Fontisto
                      name={
                        inputValue == "other"
                          ? "radio-btn-active"
                          : "radio-btn-passive"
                      }
                      size={20}
                      color="black"
                      style={{ paddingLeft: 10 }}
                    />

                    <Text
                      style={{
                        color: "black",
                        fontFamily: fonts.MontserratBold,
                        paddingLeft: 10,
                      }}
                    >
                      Other
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <Input
                  onChangeText={(val) => {
                    setinputValue(val);
                  }}
                  value={inputValue}
                  style={{
                    color: "white",
                    margin: 15,
                    fontFamily: fonts.MontserratBold,
                    fontSize: 18,
                  }}
                  cursorColor={colors.tabActiveColor}
                />
              )}

              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  props.onPress(inputValue);
                  setinputValue("");
                }}
                style={{ marginTop: "20%" }}
              >
                <InvestMore title={"SAVE"} />
              </Pressable>

              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.lbel}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal.Content>
      </Modal>
    );
  }

  function renderBody() {
    return (
      <Pressable
        onPress={() => {
          !dataRedux.PROFILE.isKycVerified &&   setModalVisible(true);
        }}
        style={[styles.row, styles.underline, styles.margintop]}
      >
        <Text style={styles.labelbg}>{props.label}</Text>
        <Text style={styles.label}>{props.value}</Text>
      </Pressable>
    );
  }

  return (
    <View>
      {renderModal()}
      {renderBody()}
    </View>
  );
};

export default ProfileInfoEdit;

const styles = StyleSheet.create({
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
  lbel: {
    color: "white",
    fontSize: 18,
    alignSelf: "center",
    fontFamily: fonts.MontserratBold,
  },
  radio: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
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
});
