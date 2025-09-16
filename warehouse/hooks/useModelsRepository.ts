import useRepositories from "@/shared/hooks/useRepositories";
import { WarehouseContext } from "../context/WarehouseProvider";

export default function useModelsRepository() {
  const { modelsRepository } = useRepositories(WarehouseContext);

  return { modelsRepository };
}
