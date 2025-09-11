import { StyleSheet, View } from "react-native";
import WarehouseItem, { WAREHOUSE_CELL_SIZE } from "./WarehouseItem";
import { WarehouseSectionProps } from "./WarehouseLayout";

const ROWS = 4;
const COLUMNS = 8;
const GAP = 4;
const CELL = WAREHOUSE_CELL_SIZE + GAP;

export default function WarehouseStands({ cells }: WarehouseSectionProps) {
  return (
    <View style={styles.container}>
      {cells.map((cell) => (
        <WarehouseItem key={cell.id} cell={cell} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    width: CELL * COLUMNS,
    height: CELL * ROWS,
  },
});
