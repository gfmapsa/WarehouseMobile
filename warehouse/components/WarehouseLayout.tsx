import AppText from "@/shared/components/text/AppText";
import React, { RefObject } from "react";
import { View } from "react-native";
import useWarehouse from "../hooks/useWarehouse";
import { WarehouseCell } from "../models/WarehouseCell";
import Warehouse from "./Warehouse";

export type WarehouseSectionProps = {
  cells: WarehouseCell[];
  itemsRef?: RefObject<{
    [key: string]: View | null;
  }>;
};

export default function WarehouseLayout() {
  const { data, isLoading, isError } = useWarehouse();

  if (isLoading || isError) return <AppText>upsi</AppText>;
  if (!data) return;

  return (
    <Warehouse>
      <Warehouse.Search>
        <Warehouse.Search.Models cells={data.cells} />
        <Warehouse.Search.Products cells={data.cells} />
      </Warehouse.Search>
      <Warehouse.Map>
        <Warehouse.Map.Lateral cells={data.lateralCells} />
        <Warehouse.Map.Stands cells={data.standCells} />
      </Warehouse.Map>
    </Warehouse>
  );
}
