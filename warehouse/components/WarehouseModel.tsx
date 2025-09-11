import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Model } from "../models/Model";
import WarehouseModelProducts from "./WarehouseModelProducts";
import WarehouseModelTitle from "./WarehouseModelTitle";

type Props = {
  model: Model;
};

export default function WarehouseModel({ model }: Props) {
  return (
    <View style={styles.container}>
      <WarehouseModelTitle mda={model.mda} modules={model.modules} />
      <WarehouseModelProducts products={model.products} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 3,
    marginBottom: hp("1%"),
  },
});
