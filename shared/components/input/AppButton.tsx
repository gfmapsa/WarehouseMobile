import { Colors } from "@/shared/constants/colors";
import * as Haptics from "expo-haptics";
import React from "react";
import { GestureResponderEvent, StyleSheet, TextStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import LoadingSpinner from "../feedback/LoadingSpinner";
import AppText from "../text/AppText";

export type AppButtonProps = ButtonProps & {
  textStyle?: TextStyle;
  isLoading?: boolean;
};

export default function AppButton({
  children,
  style,
  rippleColor,
  onPress,
  textStyle,
  isLoading,
  ...props
}: AppButtonProps) {
  function handlePress(e: GestureResponderEvent) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress && onPress(e);
  }

  return (
    <Button
      {...props}
      rippleColor={rippleColor ?? Colors.primary}
      mode="contained"
      onPress={handlePress}
      style={[styles.container, style]}
    >
      {isLoading ? (
        <LoadingSpinner size={hp("3%")} />
      ) : (
        <AppText mode="bold" style={[styles.text, textStyle]}>
          {children}
        </AppText>
      )}
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },

  text: {
    fontSize: hp("2.5%"),
    textAlign: "center",
  },
});
