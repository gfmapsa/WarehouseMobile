import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { create } from "zustand";
import { WarehouseResponse } from "../dtos/warehouse";

interface IReloadWarehouse {
  setReload: (
    fn: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<WarehouseResponse, Error>>
  ) => void;
  reload?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<WarehouseResponse, Error>>;
}

const useReloadWarehose = create<IReloadWarehouse>((set) => ({
  reload: undefined,
  setReload: (
    fn: (
      options?: RefetchOptions
    ) => Promise<QueryObserverResult<WarehouseResponse, Error>>
  ) => set({ reload: fn }),
}));

export default useReloadWarehose;
