import { Colors } from "@/shared/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type Props = {
  reset: () => void;
};

export default function RefreshIcon({ reset }: Props) {
  const rotation = useSharedValue(0);
  const [spinning, setSpinning] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  function handleClick() {
    if (spinning) return;

    setSpinning(true);

    rotation.value = withTiming(360, { duration: 500 }, (finished) => {
        if (finished) {
            rotation.value = 0;
            runOnJS(setSpinning)(false);
        }
    });
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    reset();
  }

  return (
    <Pressable style={styles.button} onPress={handleClick}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name="refresh-outline"
          size={hp("3%")}
          color={Colors.primary}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 4,
  },
});
