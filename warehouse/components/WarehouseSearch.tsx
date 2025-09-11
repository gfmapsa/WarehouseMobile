import { StyleSheet, View, ViewProps } from "react-native";
import WarehouseModelsAutocomplete from "./WarehouseModelsAutocomplete";
import WarehouseProductsAutocomplete from "./WarehouseProductsAutocomplete";

export default function WarehouseSearch(props: ViewProps) {
  return <View {...props} style={styles.container} />;
}

WarehouseSearch.Models = WarehouseModelsAutocomplete;
WarehouseSearch.Products = WarehouseProductsAutocomplete;

const styles = StyleSheet.create({
  container: { gap: 16, marginBottom: 20 },
});
