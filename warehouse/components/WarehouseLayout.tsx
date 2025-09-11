import AppText from "@/shared/components/text/AppText";
import React, { RefObject, useRef } from "react";
import { Button, View } from "react-native";
import useWarehouse from "../hooks/useWarehouse";
import { WarehouseCell } from "../models/WarehouseCell";
import Warehouse from "./Warehouse";
import { WarehouseMapHandle } from "./WarehouseMap";

export type WarehouseSectionProps = {
  cells: WarehouseCell[];
  itemsRef?: RefObject<{
    [key: string]: View | null;
  }>;
};

export default function WarehouseLayout() {
  const { data, isLoading, isError } = useWarehouse();
  const warehouseMapRef = useRef<WarehouseMapHandle>(null);

  if (isLoading || isError) return <AppText>upsi</AppText>;
  if (!data) return;

  return (
    <Warehouse>
      <Button
        title="probar scroll"
        onPress={() => warehouseMapRef.current?.scrollTo(200, 200)}
      />
      <Warehouse.Search>
        <Warehouse.Search.Models cells={data.cells} />
        <Warehouse.Search.Products cells={data.cells} />
      </Warehouse.Search>
      <Warehouse.Map ref={warehouseMapRef}>
        <Warehouse.Map.Lateral cells={data.lateralCells} />
        <Warehouse.Map.Stands cells={data.standCells} />
      </Warehouse.Map>
    </Warehouse>
  );
}
