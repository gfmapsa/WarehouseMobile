import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { create } from "zustand";
import { WarehouseResponse } from "../dtos/warehouse";
import { WarehouseContainerResponse } from "../interfaces/IWarehouseRepository";

interface IReloadWarehouse {
  setReload: (
    fn: (
      options?: RefetchOptions
    ) => Promise<
      QueryObserverResult<WarehouseResponse | WarehouseContainerResponse, Error>
    >
  ) => void;
  reload?: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<WarehouseResponse | WarehouseContainerResponse, Error>
  >;
}

const useReloadWarehose = create<IReloadWarehouse>((set) => ({
  reload: undefined,
  setReload: (
    fn: (
      options?: RefetchOptions
    ) => Promise<
      QueryObserverResult<WarehouseResponse | WarehouseContainerResponse, Error>
    >
  ) => set({ reload: fn }),
}));

export default useReloadWarehose;
