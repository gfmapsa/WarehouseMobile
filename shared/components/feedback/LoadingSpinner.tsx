import { Colors } from "@/shared/constants/colors";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native-paper";

export default function LoadingSpinner({
  color,
  ...props
}: ActivityIndicatorProps) {
  return <ActivityIndicator {...props} color={color ?? Colors.primary} />;
}
