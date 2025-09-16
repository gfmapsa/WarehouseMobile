import { Colors } from "@/shared/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BoxProps } from "./CameraBox";
import RefreshIcon from "./RefreshIcon";
import ScannerInfoBadge from "./ScannerInfoBadge";
import ScannerInfoMda from "./ScannerInfoMda";
import ScannerLoading from "./ScannerLoading";

export default function ScannerCard({
  registerScanned,
  isRegister,
  scannedMda,
  isLoading,
  badScanMessage,
  scannedModules,
  reset,
}: BoxProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      key={registerScanned?.toString()}
      style={styles.container}
    >
      <Ionicons name="qr-code-outline" size={hp("5%")} color={Colors.primary} />
      {!badScanMessage && scannedMda && (
        <ScannerInfoMda
          scannedMda={scannedMda}
          scannedModules={scannedModules}
        />
      )}
      {isLoading ? (
        <ScannerLoading isRegister={isRegister} />
      ) : (
        <ScannerInfoBadge
          isRegister={isRegister}
          registerScanned={registerScanned}
          badScanMessage={badScanMessage}
          hasScan={scannedModules === scannedMda?.modules}
        />
      )}
      <RefreshIcon reset={reset} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp("60%"),
    height: hp("25%"),
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: wp("3%"),
    position: "relative",
  },
});
