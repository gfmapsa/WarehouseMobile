import ColorBadge from "@/shared/components/feedback/ColorBadge";
import AppText from "@/shared/components/text/AppText";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ModelUbicationEnum } from "../models/Model";
import { WarehouseCell, WarehouseSectionEnum } from "../models/WarehouseCell";

type Props = {
  cell?: WarehouseCell;
  ubication?: ModelUbicationEnum;
};

export default function WarehouseCellSearch({ cell, ubication }: Props) {
  return (
    <View style={{ flex: 2 }}>
      {cell ? (
        <View style={styles.container}>
          <AppText>Fila: {cell.row}</AppText>
          <AppText>Columna: {cell.column}</AppText>
          <AppText>{WarehouseSectionEnum[cell.section]}</AppText>
        </View>
      ) : (
        <ColorBadge
          status={false}
          falseText={`${
            ubication ? `Maqueta en ${ubication}` : "Ubicación Desconocida"
          }`}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    flexWrap: "nowrap",
  },
});
