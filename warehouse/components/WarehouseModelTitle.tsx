import AppText from "@/shared/components/text/AppText";
import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type Props = {
  mda: string;
  modules?: number;
};

export default function WarehouseModelTitle({ mda, modules }: Props) {
  return (
    <View>
      <AppText mode="bold" style={styles.text}>
        {mda}
      </AppText>
      {modules && <AppText style={styles.text}>{modules} modulos</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: hp("1.5%"),
  },
});
