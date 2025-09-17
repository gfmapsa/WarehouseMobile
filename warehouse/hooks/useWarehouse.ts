import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { WAREHOUSE_KEY } from "../constants/backend";
import useReloadWarehose from "../store/useReloadWarehouse";
import useWarehouseRepository from "./useWarehouseRepository";

export default function useWarehouse() {
  const { warehouseRepository } = useWarehouseRepository();

  const { refetch, ...query } = useQuery({
    queryKey: [WAREHOUSE_KEY],
    queryFn: async () => warehouseRepository.getWarehouse(),
  });

  const { setReload } = useReloadWarehose();

  useEffect(() => {
    setReload(refetch);
  }, [refetch, setReload]);

  const itemsRef = useRef<{ [key: string]: HTMLLIElement }>({});

  return { itemsRef, refetch, ...query };
}
