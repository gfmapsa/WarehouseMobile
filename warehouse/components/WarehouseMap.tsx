import { forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import WarehouseLateral from "./WarehouseLateral";
import WarehouseStands from "./WarehouseStands";

export type WarehouseMapHandle = {
  scrollTo: (x: number, y: number) => void;
};

type Props = ScrollViewProps;

const WarehouseMapBase = forwardRef<WarehouseMapHandle, Props>((props, ref) => {
  const verticalScrollRef = useRef<ScrollView | null>(null);
  const horizontalScrollRef = useRef<ScrollView | null>(null);

  useImperativeHandle(ref, () => ({
    scrollTo: (x: number, y: number) => {
      verticalScrollRef.current?.scrollTo({ y, animated: true });
      horizontalScrollRef.current?.scrollTo({ x, animated: true });
    },
  }));

  return (
    <ScrollView ref={verticalScrollRef} showsVerticalScrollIndicator={false}>
      <ScrollView
        ref={horizontalScrollRef}
        {...props}
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
});

WarehouseMapBase.displayName = "WarehouseMap";

type WarehouseMapComponent = typeof WarehouseMapBase & {
  Stands: typeof WarehouseStands;
  Lateral: typeof WarehouseLateral;
};

const WarehouseMap = WarehouseMapBase as WarehouseMapComponent;

WarehouseMap.Stands = WarehouseStands;
WarehouseMap.Lateral = WarehouseLateral;

export default WarehouseMap;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 80,
  },
});
