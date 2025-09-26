import WarehouseLayout from "@/warehouse/components/WarehouseLayout";
import useWarehouse from "@/warehouse/hooks/useWarehouse";
import React from "react";

export default function WarehouseScreen() {
  const { data, isError, isLoading, refetch } = useWarehouse();

  return (
    <WarehouseLayout
      data={data}
      isError={isError}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
}
