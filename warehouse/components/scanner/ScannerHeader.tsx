import { Colors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ScannerHeader() {
  function handlePress() {
    Haptics.selectionAsync();
    router.back();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePress}>
        <Ionicons name="chevron-back" size={hp("5%")} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp("6%"),
    paddingLeft: wp("5%"),
    alignItems: "flex-start",
  },

  iconContainer: {
    backgroundColor: "white",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});
