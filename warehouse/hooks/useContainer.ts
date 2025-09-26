import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { CONTAINER_KEY } from "../constants/backend";
import useReloadWarehose from "../store/useReloadWarehouse";
import useWarehouseRepository from "./useWarehouseRepository";

export default function useContainer() {
  const { warehouseRepository } = useWarehouseRepository();

  const { refetch, ...query } = useQuery({
    queryKey: [CONTAINER_KEY],
    queryFn: async () => warehouseRepository.getContainer(),
  });

  const { setReload } = useReloadWarehose();

  useEffect(() => {
    setReload(refetch);
  }, [refetch, setReload]);

  const itemsRef = useRef<{ [key: string]: HTMLLIElement }>({});

  return { itemsRef, refetch, ...query };
}
