import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GET_MODEL_OUTLIERS_KEY } from "../constants/backend";
import { WarehouseCell } from "../models/WarehouseCell";
import useWarehouseRepository from "./useWarehouseRepository";

export default function useSearchModel(cells: WarehouseCell[]) {
  const modelsInCells = cells?.flatMap((cell) => cell.models);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCellModels = modelsInCells.filter((model) =>
    model.mda.toLowerCase().includes(searchTerm)
  );

  function handleSearch(value: string) {
    setSearchTerm(value);
  }

  const { warehouseRepository } = useWarehouseRepository();

  const { refetch, data, ...query } = useQuery({
    queryKey: [GET_MODEL_OUTLIERS_KEY, searchTerm],
    queryFn: async () => warehouseRepository.getModelsOutliers(searchTerm),
    enabled: false,
  });

  const areCellModels = filteredCellModels.length !== 0;

  useEffect(() => {
    if (!areCellModels) {
      refetch();
    }
  }, [searchTerm, areCellModels, refetch]);

  const filteredModels = (
    areCellModels ? filteredCellModels : data ?? []
  )?.slice(0, 4);

  return {
    filteredModels,
    handleSearch,
    ...query,
  };
}
