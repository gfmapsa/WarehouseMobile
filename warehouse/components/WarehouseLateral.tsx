import { StyleSheet, View } from "react-native";
import WarehouseItem from "./WarehouseItem";
import { WarehouseSectionProps } from "./WarehouseLayout";

export const LATERAL_GAP = 5;

export default function WarehouseLateral({ cells }: WarehouseSectionProps) {
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
    gap: LATERAL_GAP,
  },
});
