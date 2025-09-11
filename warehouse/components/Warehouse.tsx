import { StyleSheet, View, ViewProps } from "react-native";
import WarehouseMap from "./WarehouseMap";
import WarehouseSearch from "./WarehouseSearch";

export default function Warehouse({ style, ...props }: ViewProps) {
  return <View {...props} style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
});

Warehouse.Map = WarehouseMap;
Warehouse.Search = WarehouseSearch;
