import { Colors } from "@/shared/constants/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TextProps, View, ViewProps } from "react-native";
import AppText from "../text/AppText";

type Props = {
  status?: boolean;
  trueText?: string;
  falseText?: string;
  textStyle?: TextProps;
  iconSize?: number;
} & ViewProps;

export default function ColorBadge({
  status,
  trueText,
  falseText,
  iconSize = 24,
  textStyle,
  ...props
}: Props) {
  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: status
            ? Colors.successVariant
            : Colors.warningVariant,
        },
        styles.container,
      ]}
    >
      {status ? (
        <Ionicons
          name="checkmark"
          size={iconSize}
          color={status ? Colors.success : Colors.warning}
        />
      ) : (
        <EvilIcons
          name="exclamation"
          size={iconSize}
          color={status ? Colors.success : Colors.warning}
        />
      )}
      <AppText
        style={[
          {
            color: status ? Colors.success : Colors.warning,
          },
          textStyle,
        ]}
      >
        {status ? trueText : falseText}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
});
