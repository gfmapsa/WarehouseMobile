import { AnimatedText } from "@/shared/components/text/AnimatedText";
import React from "react";
import { StyleSheet } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type Props = {
  registerScanned?: boolean;
  isRegister?: boolean;
  badScanMessage?: string;
  hasScan?: boolean;
  subgroups?: boolean;
};

export default function ScannerInfoBadge({
  isRegister,
  registerScanned,
  badScanMessage,
  hasScan,
  subgroups,
}: Props) {
  const referenceText = isRegister ? "registrar" : "retirar";

  const message = badScanMessage
    ? badScanMessage
    : `Escanee el QR de ${
        registerScanned
          ? "la celda de la maqueta"
          : hasScan
          ? `la maqueta a ${referenceText}`
          : subgroups
          ? `los subgrupos de la maqueta a ${referenceText}`
          : `los módulos de la maqueta a ${referenceText}`
      }`;

  return (
    <AnimatedText
      key={
        badScanMessage ??
        (registerScanned ? "cell" : isRegister ? "register" : "retire")
      }
      entering={FadeIn.duration(250)}
      exiting={FadeOut.duration(250)}
      style={styles.text}
    >
      {message}
    </AnimatedText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: hp("2.5%"),
    textAlign: "center",
  },
});
