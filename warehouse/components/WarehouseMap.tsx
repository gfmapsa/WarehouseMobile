import useRefresh from "@/shared/hooks/useRefresh";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { forwardRef, RefObject } from "react";
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
} from "react-native";
import { WarehouseResponse } from "../dtos/warehouse";
import useMapRefs, { WarehouseMapHandle } from "../hooks/useMapRefs";
import WarehouseLateral from "./WarehouseLateral";
import WarehouseStands from "./WarehouseStands";

type Props = ScrollViewProps & {
  children?: React.ReactNode;
  itemsRef: RefObject<Record<string, View | null>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<WarehouseResponse, Error>>;
};

const WarehouseMapBase = forwardRef<WarehouseMapHandle, Props>(
  ({ itemsRef, children, refetch, ...props }, ref) => {
    const { verticalScrollRef, horizontalScrollRef } = useMapRefs(
      ref,
      itemsRef
    );

    const { refreshing, handleRefresh } = useRefresh(refetch);

    return (
      <ScrollView
        ref={verticalScrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
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
