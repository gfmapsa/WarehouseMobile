import AppText from "@/shared/components/text/AppText";
import { Colors } from "@/shared/constants/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function WarehouseEmptyCell() {
  return (
    <View style={styles.container}>
      <FontAwesome name="map-marker" size={hp("2%")} color={Colors.success} />
      <AppText style={styles.text}>Espacio libre</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },

  text: {
    fontSize: hp("2%"),
    textAlign: "center",
    color: Colors.success,
  },
});
