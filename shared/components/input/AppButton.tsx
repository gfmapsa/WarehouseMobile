import React from "react";
import { StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppText from "../text/AppText";

export default function AppButton() {
  return (
    <Ripple style={styles.container}>
      <AppText mode="bold" style={styles.text}>
        holi
      </AppText>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    textAlign: "center",
    fontSize: hp("3%"),
  },
});
