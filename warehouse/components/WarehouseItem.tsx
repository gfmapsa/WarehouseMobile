import React from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { WarehouseCell } from "../models/WarehouseCell";
import WarehouseEmptyCell from "./WarehouseEmptyCell";
import WarehouseFilledCell from "./WarehouseFilledCell";

export const WAREHOUSE_CELL_SIZE = wp("25%");

type Props = {
  cell: WarehouseCell;
};

export default function WarehouseItem({ cell }: Props) {
  const isEmpty = cell.models.length === 0;

  return (
    <View style={styles.container}>
      {isEmpty ? (
        <WarehouseEmptyCell />
      ) : (
        <WarehouseFilledCell models={cell.models} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: "white",
    borderRadius: 8,
    width: WAREHOUSE_CELL_SIZE,
    height: WAREHOUSE_CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});
