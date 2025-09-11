import { Pressable, StyleSheet } from "react-native";
import { ModelUbicationEnum } from "../models/Model";
import { WarehouseCell } from "../models/WarehouseCell";
import WarehouseCellSearch from "./WarehouseCellSearch";
import WarehouseSearchOptionTitle from "./WarehouseSearchOptionTitle";

type Props = {
  title: string;
  cell?: WarehouseCell;
  ubication: ModelUbicationEnum;
};

export default function WarehouseSearchOption({
  title,
  cell,
  ubication,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <WarehouseSearchOptionTitle title={title} />
      <WarehouseCellSearch cell={cell} ubication={ubication} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 2,
  },

  pressed: {
    backgroundColor: "#ddd",
  },
});
