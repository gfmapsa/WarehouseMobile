import AppText from "@/shared/components/text/AppText";
import { StyleSheet, View } from "react-native";

type Props = {
  title: string;
};

export default function WarehouseSearchOptionTitle({ title }: Props) {
  return (
    <View style={styles.container}>
      <AppText>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
