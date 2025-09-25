import AppError from "@/shared/components/feedback/AppError";
import React, { RefObject } from "react";
import { View } from "react-native";
import useScrollLayout from "../hooks/useScrollLayout";
import useWarehouse from "../hooks/useWarehouse";
import { WarehouseCell } from "../models/WarehouseCell";
import useScanSnack from "../store/useScanSnack";
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
  const { visible, message, onHidde, status } = useScanSnack();

  if (isError) return <AppError />;

  return (
    <>
      <Warehouse>
        {isLoading || !data ? (
          <Warehouse.Loading />
        ) : (
          <>
            <Warehouse.Search>
              <Warehouse.Search.Models
                cells={data.cells}
                onSelect={scrollToCell}
              />
              <Warehouse.Search.Products
                cells={data.cells}
                onSelect={scrollToCell}
              />
            </Warehouse.Search>
            <Warehouse.Map ref={warehouseMapRef} itemsRef={itemsRef}>
              <Warehouse.Map.Lateral
                cells={data.lateralCells}
                itemsRef={itemsRef}
              />
              <Warehouse.Map.Stands
                cells={data.standCells}
                itemsRef={itemsRef}
              />
            </Warehouse.Map>
          </>
        )}
      </Warehouse>
      {!isLoading && <Warehouse.Actions />}
      <Warehouse.Snackbar
        visible={visible}
        onDismiss={onHidde}
        severity={status}
      >
        {message}
      </Warehouse.Snackbar>
    </>
  );
}
