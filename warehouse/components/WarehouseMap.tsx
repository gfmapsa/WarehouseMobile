import { useRef } from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import WarehouseLateral from "./WarehouseLateral";
import WarehouseStands from "./WarehouseStands";

export default function WarehouseMap(props: ScrollViewProps) {
  const verticalScrollRef = useRef(null);
  const horizontalScrollRef = useRef(null);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      directionalLockEnabled={false}
      ref={verticalScrollRef}
    >
      <ScrollView
        {...props}
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={false}
        ref={horizontalScrollRef}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 80,
  },
});

WarehouseMap.Stands = WarehouseStands;
WarehouseMap.Lateral = WarehouseLateral;
