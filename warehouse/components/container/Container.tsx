import { StyleSheet, View, ViewProps } from "react-native";
import WarehouseActions from "../WarehouseActions";
import WarehouseSearch from "../WarehouseSearch";
import ContainerMap from "./ContainerMap";
import ContainerSkeleton from "./ContainerSkeleton";
import ContainerSnackbar from "./ContainerSnackbar";

export default function Container({ style, ...props }: ViewProps) {
  return <View {...props} style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
});

Container.Map = ContainerMap;
Container.Search = WarehouseSearch;
Container.Loading = ContainerSkeleton;
Container.Actions = WarehouseActions;
Container.Snackbar = ContainerSnackbar;
