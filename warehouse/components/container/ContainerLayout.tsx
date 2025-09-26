import AppError from "@/shared/components/feedback/AppError";
import useScrollLayout from "@/warehouse/hooks/useScrollLayout";
import { WarehouseContainerResponse } from "@/warehouse/interfaces/IWarehouseRepository";
import { WarehouseCell } from "@/warehouse/models/WarehouseCell";
import useScanSnack from "@/warehouse/store/useScanSnack";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React, { RefObject } from "react";
import { View } from "react-native";
import Container from "./Container";

export type WarehouseSectionProps = {
  cells: WarehouseCell[];
  itemsRef?: RefObject<{
    [key: string]: View | null;
  }>;
};

export type WarehouseSelectCellProp = {
  onSelect?: (cellId: string) => void;
};

type Props = {
  data?: WarehouseContainerResponse;
  isLoading: boolean;
  isError: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<WarehouseContainerResponse, Error>>;
};

export type WarehouseSearchProps = WarehouseSelectCellProp &
  WarehouseSectionProps;

export default function ContainerLayout({
  data,
  isLoading,
  isError,
  refetch,
}: Props) {
  const { warehouseMapRef, itemsRef, scrollToCell } = useScrollLayout();
  const { visible, message, onHidde, status } = useScanSnack();

  if (isError) return <AppError />;

  return (
    <>
      <Container>
        {isLoading || !data ? (
          <Container.Loading />
        ) : (
          <>
            <Container.Search>
              <Container.Search.Models
                cells={data.cells}
                onSelect={scrollToCell}
              />
              <Container.Search.Products
                cells={data.cells}
                onSelect={scrollToCell}
              />
            </Container.Search>
            <Container.Map
              ref={warehouseMapRef}
              itemsRef={itemsRef}
              refetch={refetch}
            >
              <Container.Map.Stands cells={data.cells} itemsRef={itemsRef} />
            </Container.Map>
          </>
        )}
      </Container>
      {!isLoading && <Container.Actions />}
      <Container.Snackbar
        visible={visible}
        onDismiss={onHidde}
        severity={status}
      >
        {message}
      </Container.Snackbar>
    </>
  );
}
