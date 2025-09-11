import { createContext, PropsWithChildren, useMemo } from "react";
import { IWarehouseRepository } from "../interfaces/IWarehouseRepository";
import { WarehouseRepository } from "../repositories/WarehouseRepository";

type WarehouseContextType = {
  warehouseRepository: IWarehouseRepository;
};

export const WarehouseContext = createContext<WarehouseContextType | undefined>(
  undefined
);

export default function WarehouseProvider({ children }: PropsWithChildren) {
  const repositories = useMemo(() => {
    const repositories: WarehouseContextType = {
      warehouseRepository: new WarehouseRepository(),
    };

    return repositories;
  }, []);

  return (
    <WarehouseContext.Provider value={repositories}>
      {children}
    </WarehouseContext.Provider>
  );
}
