import { DrawerContentComponentProps } from "@react-navigation/drawer";
import * as Haptics from "expo-haptics";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import DrawerItem from "./DrawerItem";

export default function DrawerContent({
  navigation,
  state,
}: DrawerContentComponentProps) {
  function handleNavigate(path: string) {
    Haptics.selectionAsync();
    navigation.navigate(path);
  }

  const activeRoute = state.routes[state.index].name;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        src="https://map-sa.com.ar/wp-content/themes/mapsa/img/logo.png"
        style={styles.image}
      />
      <View>
        <DrawerItem
          onPress={() => handleNavigate("index")}
          active={activeRoute === "index"}
        >
          Deposito
        </DrawerItem>
        <DrawerItem
          onPress={() => handleNavigate("add-model")}
          active={activeRoute === "add-model"}
        >
          Registrar maqueta
        </DrawerItem>
        <DrawerItem
          onPress={() => handleNavigate("report")}
          active={activeRoute === "report"}
        >
          Problemas/Mejoras
        </DrawerItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp("10%"),
    paddingHorizontal: hp("3%"),
    alignItems: "center",
    gap: hp("3%"),
  },

  image: {
    width: 200,
    height: 100,
    objectFit: "contain",
    alignSelf: "center",
  },
});
