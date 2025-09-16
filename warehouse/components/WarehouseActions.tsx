import { Colors } from "@/shared/constants/colors";
import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import useQrScanner from "../hooks/useQrScanner";

export default function WarehouseActions() {
  const { addModel, removeModel } = useQrScanner();

  return (
    <>
      <FAB
        icon={"plus"}
        onPress={addModel}
        style={[styles.fabStyle, styles.plus]}
        color={Colors.primary}
      />
      <FAB
        icon={"minus"}
        onPress={removeModel}
        style={[styles.fabStyle, styles.minus]}
        color={Colors.primary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    right: wp("5%"),
    backgroundColor: "#DDD",
    borderRadius: "50%",
  },

  plus: {
    bottom: hp("16%"),
  },

  minus: {
    bottom: hp("7%"),
  },
});
