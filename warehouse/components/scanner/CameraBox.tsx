import { Colors } from "@/shared/constants/colors";
import { ModelScan } from "@/warehouse/dtos/warehouse";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ScannerCard from "./ScannerCard";

export type BoxProps = {
  registerScanned?: boolean;
  isRegister?: boolean;
  scannedMda?: ModelScan;
  isLoading?: boolean;
  badScanMessage?: string;
  scannedModules?: number;
  reset: () => void;
};

type Props = {
  scanning: boolean;
} & BoxProps;

export default function CameraBox({ scanning, ...props }: Props) {
  const translateY = useRef(new Animated.Value(0)).current;

  const borderColor = scanning ? Colors.success : "white";

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  const lineTranslate = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BOX_SIZE],
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.overlayTop} />

      <View style={styles.middleRow}>
        <View style={styles.overlaySide} />
        <View style={styles.box}>
          <View style={[styles.corner, styles.topLeft, { borderColor }]} />
          <View style={[styles.corner, styles.topRight, { borderColor }]} />
          <View style={[styles.corner, styles.bottomLeft, { borderColor }]} />
          <View style={[styles.corner, styles.bottomRight, { borderColor }]} />
          <Animated.View
            style={[
              styles.lineContainer,
              { transform: [{ translateY: lineTranslate }] },
            ]}
          >
            <LinearGradient
              colors={["transparent", Colors.successVariant, "transparent"]}
              style={styles.line}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
          </Animated.View>
        </View>
        <View style={styles.overlaySide} />
      </View>

      <View style={styles.overlayBottom}>
        <ScannerCard {...props} />
      </View>
    </View>
  );
}

const BOX_SIZE = wp("60%");
const CORNER_SIZE = wp("5%");
const BORDER_WIDTH = 4;

const styles = StyleSheet.create({
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  overlayBottom: {
    flex: 3,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    paddingTop: hp("10%"),
  },

  middleRow: {
    flexDirection: "row",
    height: BOX_SIZE,
  },

  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  box: {
    width: BOX_SIZE,
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },

  lineContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
  },

  line: {
    height: 6,
    width: "100%",
  },

  corner: {
    position: "absolute",
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: Colors.successVariant,
  },

  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
  },

  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
  },
});
