import { StyleSheet, View } from "react-native";
import WarehouseItem, { WAREHOUSE_CELL_SIZE } from "./WarehouseItem";
import { WarehouseSectionProps } from "./WarehouseLayout";

export const STANDS_ROWS = 4;
export const STANDS_COLUMNS = 8;
export const STANDS_GAP = 4;
export const STANDS_CELL = WAREHOUSE_CELL_SIZE + STANDS_GAP;

export default function WarehouseStands({
  cells,
  itemsRef,
}: WarehouseSectionProps) {
  return (
    <View style={styles.container}>
      {cells.map((cell) => (
        <WarehouseItem
          key={cell.id}
          cell={cell}
          ref={(el) => {
            if (itemsRef && itemsRef.current) {
              itemsRef.current[cell.id] = el;
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: STANDS_GAP,
    width: STANDS_CELL * STANDS_COLUMNS,
    height: STANDS_CELL * STANDS_ROWS,
  },
});
