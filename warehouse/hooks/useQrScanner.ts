import { router } from "expo-router";

export type WarehouseModelActions = "register" | "remove";

export default function useQrScanner() {
  function addModel() {
    toggleScanner("register");
  }

  function removeModel() {
    toggleScanner("remove");
  }

  function toggleScanner(action: WarehouseModelActions) {
    router.push({ pathname: "/scanner", params: { action } });
  }

  return { addModel, removeModel };
}
