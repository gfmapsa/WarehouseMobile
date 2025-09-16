import AppText from "@/shared/components/text/AppText";
import { ModelScan } from "@/warehouse/dtos/warehouse";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = {
  scannedMda?: ModelScan;
  scannedModules?: number;
};

export default function ScannerInfoMda({ scannedMda, scannedModules }: Props) {
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
      style={styles.container}
    >
      <AppText style={styles.title}>{scannedMda?.mda}</AppText>

      {!!scannedModules &&
        scannedMda &&
        scannedModules !== scannedMda.modules && (
          <AppText style={styles.modules}>
            Módulos escaneados: {scannedModules}/{scannedMda?.modules}
          </AppText>
        )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 4,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 14,
    textAlign: "center",
  },

  modules: {
    fontSize: 12,
    color: "#333",
  },
});
