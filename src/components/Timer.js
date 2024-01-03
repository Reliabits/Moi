import React from "react";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import fonts from "../theme/fonts";
import moment from "moment";

function Timer(props) {
  let [timerValue, setTimerValue] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerValue == -1) {
        clearTimeout(interval);
        setTimerValue('Time Expired')

      } else {
        timerValue--;
        setTimerValue(timerValue);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      style={{
        fontFamily: fonts.MontserratBold,
        color: "#ffef22",
        alignSelf: "center",
      }}
    >
      {moment.utc(timerValue * 1000).format("mm:ss")}
    </Text>
  );
}

export default Timer;
