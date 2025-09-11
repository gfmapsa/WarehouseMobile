import { useQuery } from "@tanstack/react-query";
import { WAREHOUSE_KEY } from "../constants/backend";
import useWarehouseRepository from "./useWarehouseRepository";
import { useRef } from "react";

export default function useWarehouse() {
  const { warehouseRepository } = useWarehouseRepository();

  const query = useQuery({
    queryKey: [WAREHOUSE_KEY],
    queryFn: async () => warehouseRepository.getWarehouse(),
  });

  const itemsRef = useRef<{ [key: string]: HTMLLIElement }>({});

  return { itemsRef, ...query };
}
