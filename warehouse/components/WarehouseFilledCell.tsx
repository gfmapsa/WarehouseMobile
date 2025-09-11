import React from "react";
import { View } from "react-native";
import { Model } from "../models/Model";
import WarehouseModel from "./WarehouseModel";

type Props = {
  models?: Model[];
};

export default function WarehouseFilledCell({ models }: Props) {
  return (
    <View>
      {models?.map((model) => (
        <WarehouseModel key={model.mda} model={model} />
      ))}
    </View>
  );
}
