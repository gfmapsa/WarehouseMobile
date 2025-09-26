import useRefresh from "@/shared/hooks/useRefresh";
import useMapRefs, { WarehouseMapHandle } from "@/warehouse/hooks/useMapRefs";
import { WarehouseContainerResponse } from "@/warehouse/interfaces/IWarehouseRepository";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { forwardRef, RefObject } from "react";
import {
    RefreshControl,
    ScrollView,
    ScrollViewProps,
    StyleSheet,
    View,
} from "react-native";
import ContainerStands from "./ContainerStands";

type Props = ScrollViewProps & {
  children?: React.ReactNode;
  itemsRef: RefObject<Record<string, View | null>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<WarehouseContainerResponse, Error>>;
};

const ContainerMapBase = forwardRef<WarehouseMapHandle, Props>(
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
        contentContainerStyle={{ paddingBottom: 200, alignItems: "center" }}
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

ContainerMapBase.displayName = "ContainerMap";

type ContainerMapComponent = typeof ContainerMapBase & {
  Stands: typeof ContainerStands;
};

const ContainerMap = ContainerMapBase as ContainerMapComponent;
ContainerMap.Stands = ContainerStands;

export default ContainerMap;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 80,
  },
});
