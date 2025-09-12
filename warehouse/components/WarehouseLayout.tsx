import AppText from "@/shared/components/text/AppText";
import React, { RefObject } from "react";
import { View } from "react-native";
import useScrollLayout from "../hooks/useScrollLayout";
import useWarehouse from "../hooks/useWarehouse";
import { WarehouseCell } from "../models/WarehouseCell";
import Warehouse from "./Warehouse";

export type WarehouseSectionProps = {
  cells: WarehouseCell[];
  itemsRef?: RefObject<{
    [key: string]: View | null;
  }>;
};

export type WarehouseSelectCellProp = {
  onSelect?: (cellId: string) => void;
};

export type WarehouseSearchProps = WarehouseSelectCellProp &
  WarehouseSectionProps;

export default function WarehouseLayout() {
  const { data, isLoading, isError } = useWarehouse();
  const { warehouseMapRef, itemsRef, scrollToCell } = useScrollLayout();

  if (isLoading || isError) return <AppText>upsi</AppText>;
  if (!data) return;

  return (
    <Warehouse>
      <Warehouse.Search>
        <Warehouse.Search.Models cells={data.cells} onSelect={scrollToCell} />
        <Warehouse.Search.Products cells={data.cells} onSelect={scrollToCell} />
      </Warehouse.Search>
      <Warehouse.Map ref={warehouseMapRef} itemsRef={itemsRef}>
        <Warehouse.Map.Lateral cells={data.lateralCells} itemsRef={itemsRef} />
        <Warehouse.Map.Stands cells={data.standCells} itemsRef={itemsRef} />
      </Warehouse.Map>
    </Warehouse>
  );
}
