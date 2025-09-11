import useRepositories from "@/shared/hooks/useRepositories";
import { WarehouseContext } from "../context/WarehouseProvider";

export default function useWarehouseRepository() {
  const { warehouseRepository } = useRepositories(WarehouseContext);

  return { warehouseRepository };
}
