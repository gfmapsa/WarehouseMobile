import ScannerLayout from "@/warehouse/components/scanner/ScannerLayout";
import { WarehouseModelActions } from "@/warehouse/hooks/useQrScanner";
import { useLocalSearchParams } from "expo-router";

export default function ScannerScreen() {
  const { action } = useLocalSearchParams();

  return <ScannerLayout action={action as WarehouseModelActions} />;
}
