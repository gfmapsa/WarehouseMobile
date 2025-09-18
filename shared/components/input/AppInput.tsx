import { Colors } from "@/shared/constants/colors";
import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import AppText from "../text/AppText";

export type AppInputProps = {
  value: string;
  setValue: (val: string) => void;
  isLoading?: boolean;
} & TextInputProps &
  PropsWithChildren;

const RADIUS = 8;

export default function AppInput({
  value,
  setValue,
  onChangeText,
  label,
  children,
  isLoading,
  ...props
}: AppInputProps) {
  return (
    <TextInput
      {...props}
      mode="flat"
      label={<AppText style={{ opacity: 0.8 }}>{label}</AppText>}
      value={value}
      onChangeText={(text) => {
        setValue(text);
        onChangeText && onChangeText(text);
      }}
      style={styles.input}
      underlineStyle={{ display: "none" }}
      textColor={Colors.primary}
      activeUnderlineColor={Colors.primary}
      theme={{ roundness: RADIUS }}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: Colors.primary,
    borderRadius: RADIUS,
    elevation: 5,
  },
});
