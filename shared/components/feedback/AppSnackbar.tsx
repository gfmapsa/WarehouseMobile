import { Colors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Snackbar, SnackbarProps } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AppText from "../text/AppText";

export type SnackSeverity = "error" | "success" | "info";

export type SnackProps = {
  severity?: SnackSeverity;
};

export type AppSnackProps = SnackProps & SnackbarProps;

export default function AppSnackbar({
  severity = "error",
  children,
  onDismiss,
  ...props
}: AppSnackProps) {
  function handleDismiss() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDismiss();
  }

  return (
    <Snackbar
      {...props}
      onDismiss={onDismiss}
      style={[
        {
          backgroundColor:
            severity === "error"
              ? Colors.danger
              : severity === "success"
              ? Colors.success
              : Colors.primaryVariant,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.info}>
          {severity === "error" ? (
            <Ionicons
              name="alert-circle-outline"
              size={24}
              color={Colors.dangerVariant}
            />
          ) : severity === "success" ? (
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={Colors.successVariant}
            />
          ) : (
            <AppText>⏳</AppText>
          )}

          <AppText
            style={{
              color:
                severity === "error"
                  ? Colors.dangerVariant
                  : severity === "success"
                  ? Colors.successVariant
                  : Colors.primary,
            }}
          >
            {children}
          </AppText>
        </View>
        <TouchableOpacity onPress={handleDismiss}>
          <Ionicons name="close-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
});
