import { BACKEND_ERROR_MESSAGE } from "@/shared/constants/backend";
import { Colors } from "@/shared/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View, ViewProps } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppText from "../text/AppText";

export default function AppError({
  children = BACKEND_ERROR_MESSAGE,
  ...props
}: ViewProps) {
  return (
    <View {...props} style={[styles.container]}>
      <Ionicons name="warning" color={Colors.primary} size={hp("5%")} />
      <AppText style={styles.text}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: hp("10%"),
    paddingHorizontal: hp("1%"),
    gap: 10,
  },

  text: {
    fontSize: hp("3%"),
    color: Colors.primary,
    textAlign: "center",
  },
});
