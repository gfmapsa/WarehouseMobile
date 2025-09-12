import { Colors } from "@/shared/constants/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function WarehouseActions() {
  return (
    <>
      <AnimatedFAB
        extended={false}
        icon={"plus"}
        label={"Label"}
        onPress={() => console.log("Pressed")}
        style={[styles.fabStyle, styles.plus]}
        color={Colors.primary}
      />
      <AnimatedFAB
        extended={false}
        icon={"minus"}
        label={"Label"}
        onPress={() => console.log("Pressed")}
        style={[styles.fabStyle, styles.minus]}
        color={Colors.primary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  fabStyle: {
    position: "absolute",
    right: wp("5%"),
    backgroundColor: "#DDD",
  },

  plus: {
    bottom: hp("13%"),
  },

  minus: {
    bottom: hp("4%"),
  },
});
