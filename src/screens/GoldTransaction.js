/**
 * @description      :
 * @author           : sheezy
 * @group            :
 * @created          : 01/02/2023 - 12:47:49
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 01/02/2023
 * - Author          : sheezy
 * - Modification    :
 **/
import {
  ActivityIndicator,
  Alert,
  FlatList,
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import fonts from "../theme/fonts";
import HeaderDrawer from "../components/HeaderDrawer";
import { useEffect } from "react";
import ButtonNoLine from "../components/ButtonNoLine";
import colors from "../assets/colors";
import InvestMore from "../components/InvestMore";
import apis from "../lib/apis";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFetchBlob from "rn-fetch-blob";
import { useNavigation } from "@react-navigation/native";

const GoldTransaction = (props) => {
  const navigation = useNavigation();
  // const [state, setState] = useState(props);
  const [transactionList, settransactionList] = useState([]);
  const [balance, setBalance] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loaderInvoice, setLoaderInvoice] = useState(false);
  const [downloadingInvoiceId, setDownloadingInvoiceId] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("abcdefghijkl", props);

  // useEffect(() => {
  //   console.log("Test Render  from GoldTransaction page,",props);
  //   // transactionList
  //   // settransactionList()
  //   // console.log("Transaction", transactionList)
  //   // console.log("setTransaction", settransactionList)
  // }, []);

  useEffect(() => {
    getTransacation();
    walletApi();
  }, []);
  useEffect(() => {
    getTransacation();
    walletApi();
    console.log("transaction");
    console.log("props frompaymentpayu", props);
  }, [props]);

  function getTransacation() {
    setLoading(true);
    apis
      .getTransacation()
      .then((res) => {
        console.log("Res in gettransaction", res);
        if (res.status == 200) {
          settransactionList(res.data.data);
        }
      })
      .catch((Err) => {
        console.log("err", Err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function walletApi() {
    apis
      .walletApi()
      .then((res) => {
        // console.log("response", (res))

        setBalance(res.data.data);

        if (res.data.message) {
          console.log("success", res.data.message);
        } else {
          console.log("error", res.data.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  function getInvoices(id) {
    console.log("txn id for invoice", id);
    setLoaderInvoice(true);
    setDownloadingInvoiceId(id);
    apis
      .getInvoices(id)
      .then(async (res) => {
        console.log("res html", res);
        await createPDF(res.data.invoice_html, id);
        if (res.data.message) {
          console.log("success", res.data.message);
        } else {
          console.log("error", res.data.error);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoader(false);
        setDownloadingInvoiceId("");
        setLoaderInvoice(false);
      });
  }

  const isPermitted = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs access to Storage data",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        // console.log("granted :",granted)
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert("Write permission err", err);
        return false;
      }
    } else {
      return true;
    }
  };

  var createPDF = async (data, id) => {
    console.log("id for createpdf", id);
    // console.log("id pass through pdf things", id)
    console.log("data of html :", data);
    if (await isPermitted()) {
      let options = {
        html: data,
        fileName: "invoice",
        directory: "Documents",
        base64: true,
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log("before :", file);

      // let filePath = RNFetchBlob.fs.dirs.DownloadDir + '/invoice.pdf' ;
      let filePath = `/storage/emulated/0/Download/${id}.pdf`;
      console.log("file path :", filePath);
      RNFetchBlob.fs
        .writeFile(filePath, file.base64, "base64")
        .then((response) => {
          console.log("Success Log: ", response);
        })
        .catch((errors) => {
          console.log(" Error Log: ", errors);
        });
      setLoaderInvoice(false);
      alert("Success", `PDF saved to Download`);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <HeaderDrawer profile={null} navigation={props.navigation} />

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "center" }}
          data={transactionList}
          ListHeaderComponent={() => {
            return (
              <View style={{ backgroundColor: colors.bg }}>
                <View style={{ padding: 20 }}>
                  <Text
                    style={{
                      fontFamily: fonts.MontserratBold,
                      fontSize: 16,
                      color: "white",
                    }}>
                    Gold in locker:
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.MontserratBold,
                      fontSize: 18,
                      color: "white",
                    }}>
                    {loader ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      balance?.gold_balance?.toFixed(4)
                    )}
                    gm
                  </Text>

                  <Pressable
                    onPress={() => {
                      navigation.navigate("Buy Gold");
                    }}>
                    <InvestMore
                      title={"Invest more"}
                      style={{ width: "100%" }}
                    />
                  </Pressable>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: "white",
                fontFamily: fonts.MontserratBold,
                alignSelf: "center",
                fontSize: 20,
                paddingTop: "50%",
              }}>
              No Transactions Yet
            </Text>
          )}
          renderItem={({ item }) => {
            // console.log("item", item);
            return (
              <View
                style={{
                  borderColor: colors.bg,
                  borderWidth: 1,
                  flexDirection: "row",
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginTop: 10,
                  // padding: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}>
                <MaterialCommunityIcons
                  name={"gold"}
                  size={40}
                  color={colors.tabActiveColor}
                  style={{ alignSelf: "center" }}
                />

                <View style={{ marginLeft: 10 }}>
                  {item.type == "SELL-GOLD" ? (
                    <Text
                      style={{
                        color: "white",
                        fontFamily: fonts.MontserratMedium,

                        fontSize: 18,
                      }}>
                      Sell Gold
                    </Text>
                  ) : item.type == "BUY-GOLD" ? (
                    <Text
                      style={{
                        color: "white",
                        fontFamily: fonts.MontserratMedium,

                        fontSize: 18,
                      }}>
                      Manual Gold Purchase
                    </Text>
                  ) : (
                    <Text>Nothing</Text>
                  )}

                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ width: "60%" }}>
                      <Text
                        style={{
                          color: "white",
                          paddingTop: 10,
                          fontFamily: fonts.MontserratMedium,
                          fontSize: 14,
                        }}>
                        {item.amount.toFixed(2)} Rupees
                      </Text>

                      <Text
                        style={{
                          color: "white",
                          fontFamily: fonts.MontserratMedium,
                          fontSize: 10,
                        }}>
                        {"TXN ID - " + item?.txnid}
                      </Text>
                      {item.type == "BUY-GOLD" ? (
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 10,
                          }}>
                          {"Quantity - " + item?.quantity?.toFixed(4) + " gm"}
                        </Text>
                      ) : item.type == "SELL-GOLD" ? (
                        <Text
                          style={{
                            color: "white",
                            fontFamily: fonts.MontserratMedium,
                            fontSize: 10,
                          }}>
                          {"Quantity - " + item?.quantity + " gm"}
                        </Text>
                      ) : (
                        ""
                      )}
                    </View>

                    <View
                      style={{
                        width: "35%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      {item.status == "PENDING" ? (
                        ""
                      ) : item.status == "REJECTED" ? (
                        ""
                      ) : item.status == "FAILED" ? (
                        ""
                      ) : item.status == "SUCCESSFUL" &&
                        loaderInvoice &&
                        downloadingInvoiceId == item.txnid ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            getInvoices(item.txnid);
                          }}
                          style={{
                            flexDirection: "row",
                            width: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <AntDesign name="download" size={20} color="white" />
                          <Text style={{ color: "white", fontSize: 12 }}>
                            Invoice
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}>
                    <Text
                      style={{
                        color:
                          item.status == "PENDING"
                            ? "yellow"
                            : item.status == "SUCCESSFUL"
                            ? "green"
                            : "white" && item.status == "REJECTED"
                            ? "red"
                            : "white",

                        paddingTop: 10,
                        fontFamily: fonts.MontserratBold,
                        fontSize: 16,
                      }}>
                      {item.status}
                    </Text>
                    <Text
                      style={{
                        paddingStart: 22,
                        color: "white",
                        fontFamily: fonts.MontserratMedium,
                        alignSelf: "flex-end",
                        textAlign: "right",
                        marginLeft: 15,
                        fontSize: 10,
                      }}>
                      {moment(item?.createdAt).format("lll")}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default GoldTransaction;

const styles = StyleSheet.create({});
