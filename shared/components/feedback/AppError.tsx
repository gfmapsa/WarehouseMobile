import { BACKEND_ERROR_MESSAGE } from "@/shared/constants/backend";
import { Colors } from "@/shared/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppText from "../text/AppText";

export type AppErrorProps = ScrollViewProps;

export default function AppError({
  children = BACKEND_ERROR_MESSAGE,
  ...props
}: AppErrorProps) {
  return (
    <ScrollView {...props} contentContainerStyle={[styles.container]}>
      <Ionicons name="warning" color={Colors.primary} size={hp("5%")} />
      <AppText style={styles.text}>{children}</AppText>
    </ScrollView>
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
