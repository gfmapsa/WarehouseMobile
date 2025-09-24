import AddModelLayout from "@/warehouse/components/model/AddModelLayout";
import { useLocalSearchParams } from "expo-router";

export default function AddModelScreen() {
  const { code } = useLocalSearchParams();

  return <AddModelLayout code={code as string} />;
}
