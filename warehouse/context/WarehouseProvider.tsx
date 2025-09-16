import { createContext, PropsWithChildren, useMemo } from "react";
import { IModelsRepository } from "../interfaces/IModelsRepository";
import { IWarehouseRepository } from "../interfaces/IWarehouseRepository";
import { ModelsRepository } from "../repositories/ModelsRepository";
import { WarehouseRepository } from "../repositories/WarehouseRepository";

type WarehouseContextType = {
  warehouseRepository: IWarehouseRepository;
  modelsRepository: IModelsRepository;
};

export const WarehouseContext = createContext<WarehouseContextType | undefined>(
  undefined
);

export default function WarehouseProvider({ children }: PropsWithChildren) {
  const repositories = useMemo(() => {
    const repositories: WarehouseContextType = {
      warehouseRepository: new WarehouseRepository(),
      modelsRepository: new ModelsRepository(),
    };

    return repositories;
  }, []);

  return (
    <WarehouseContext.Provider value={repositories}>
      {children}
    </WarehouseContext.Provider>
  );
}
