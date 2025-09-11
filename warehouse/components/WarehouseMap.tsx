import { forwardRef, RefObject } from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import useMapRefs, { WarehouseMapHandle } from "../hooks/useMapRefs";
import WarehouseLateral from "./WarehouseLateral";
import WarehouseStands from "./WarehouseStands";

type Props = ScrollViewProps & {
  children?: React.ReactNode;
  itemsRef: RefObject<Record<string, View | null>>;
};

const WarehouseMapBase = forwardRef<WarehouseMapHandle, Props>(
  ({ itemsRef, children, ...props }, ref) => {
    const { verticalScrollRef, horizontalScrollRef } = useMapRefs(
      ref,
      itemsRef
    );

    return (
      <ScrollView ref={verticalScrollRef} showsVerticalScrollIndicator={false}>
        <ScrollView
          ref={horizontalScrollRef}
          {...props}
          horizontal
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </ScrollView>
    );
  }
);

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
