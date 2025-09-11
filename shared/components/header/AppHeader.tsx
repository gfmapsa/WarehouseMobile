import { Colors } from "@/shared/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AppText from "../text/AppText";

export default function AppHeader({
  navigation,
  route,
  options,
}: DrawerHeaderProps) {
  const title = options.title ?? route.name;

  function toggleDrawer() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.toggleDrawer();
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleDrawer}>
        <Ionicons name="menu" size={hp("4%")} color={Colors.primary} />
      </Pressable>
      <AppText style={styles.text}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingStart: 16,
    paddingTop: 50,
    gap: 8,
    alignItems: "center",
  },

  text: {
    fontSize: hp("5%"),
  },
});
