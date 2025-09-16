import { AnimatedText } from "@/shared/components/text/AnimatedText";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

type Props = {
  isRegister?: boolean;
};

export default function ScannerLoading({ isRegister }: Props) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1, // infinito
      true // reverse
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <AnimatedText style={[styles.text, animatedStyle]}>
      {isRegister ? "Registrando" : "Retirando"} maqueta...
    </AnimatedText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});
