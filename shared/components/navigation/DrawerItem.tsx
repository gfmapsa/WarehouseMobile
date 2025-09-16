import { Colors } from "@/shared/constants/colors";
import React, { PropsWithChildren } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppText from "../text/AppText";

type Props = Omit<TouchableOpacityProps, "children"> & PropsWithChildren;

export default function DrawerItem({ children, ...props }: Props) {
  return (
    <TouchableOpacity {...props}>
      <AppText style={styles.text}>{children}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: hp("3.2%"),
    color: Colors.primary,
    marginLeft: wp("2%"),
    marginBottom: hp("3%"),
    textAlign: "center",
  },
});
