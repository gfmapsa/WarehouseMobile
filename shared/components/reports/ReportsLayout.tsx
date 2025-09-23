import useContact from "@/shared/hooks/useContact";
import React from "react";
import { View } from "react-native";
import FormText from "../input/FormText";
import Textarea from "../input/Textarea";

export default function ReportsLayout() {
  const { control } = useContact();

  return (
    <View>
      <FormText control={control} name="subject" label="Asunto" />
      <Textarea control={control} name="description" label="Descripción" />
    </View>
  );
}
