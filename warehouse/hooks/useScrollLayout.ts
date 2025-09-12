import { useRef } from "react";
import { View } from "react-native";
import { WarehouseMapHandle } from "./useMapRefs";

export default function useScrollLayout() {
  const warehouseMapRef = useRef<WarehouseMapHandle>(null);
  const itemsRef = useRef<Record<string, View | null>>({});

  function scrollToCell(cellId: string) {
    warehouseMapRef.current?.scrollToCell(cellId);
  }

  return { warehouseMapRef, itemsRef, scrollToCell };
}
