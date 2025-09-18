import { Colors } from "@/shared/constants/colors";
import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import AppText from "../text/AppText";

export type AppInputProps = {
  value: string;
  setValue: (val: string) => void;
  containerStyle?: ViewStyle;
} & TextInputProps &
  PropsWithChildren;

const RADIUS = 8;

export default function AppInput({
  value,
  setValue,
  onChangeText,
  label,
  children,
  containerStyle,
  ...props
}: AppInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        mode="flat"
        label={<AppText style={{ opacity: 0.8 }}>{label}</AppText>}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          onChangeText && onChangeText(text);
        }}
        style={props.style ?? styles.input}
        underlineStyle={{ display: "none" }}
        textColor={props.textColor ?? Colors.primary}
        activeUnderlineColor={Colors.primary}
        theme={{ roundness: RADIUS }}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  input: {
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderRadius: RADIUS,
    elevation: 5,
  },
});
