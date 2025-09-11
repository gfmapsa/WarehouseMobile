import AppText from "@/shared/components/text/AppText";
import React, { RefObject, useRef } from "react";
import { Button, View } from "react-native";
import { WarehouseMapHandle } from "../hooks/useMapRefs";
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
  const warehouseMapRef = useRef<WarehouseMapHandle>(null);
  const itemsRef = useRef<Record<string, View | null>>({});

  if (isLoading || isError) return <AppText>upsi</AppText>;
  if (!data) return;

  function scrollToCell(cellId: string) {
    warehouseMapRef.current?.scrollToCell(cellId);
  }

  return (
    <Warehouse>
      <Button
        title="probar scroll"
        onPress={() => scrollToCell(data.cells[20]?.id.toString() || "")}
      />
      <Warehouse.Search>
        <Warehouse.Search.Models cells={data.cells} onSelect={scrollToCell} />
        <Warehouse.Search.Products
          cells={data.cells}
          //onSelectCell={scrollToCell}
        />
      </Warehouse.Search>
      <Warehouse.Map ref={warehouseMapRef} itemsRef={itemsRef}>
        <Warehouse.Map.Lateral cells={data.lateralCells} itemsRef={itemsRef} />
        <Warehouse.Map.Stands cells={data.standCells} itemsRef={itemsRef} />
      </Warehouse.Map>
    </Warehouse>
  );
}
