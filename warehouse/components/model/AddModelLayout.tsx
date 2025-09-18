import AppAutocomplete from "@/shared/components/input/AppAutocomplete";
import FormText from "@/shared/components/input/FormText";
import AppText from "@/shared/components/text/AppText";
import useAddModel, { AddModelData } from "@/warehouse/hooks/useAddModel";
import React from "react";
import { View } from "react-native";

export default function AddModelLayout() {
  const {
    control,
    handleSubmit,
    onSubmit,
    //onHidde,
    //snackbarVisible,
    isPending,
    message,
    partNumbers,
    isErrorMutating,
    isLoading,
    onChangeMda,
  } = useAddModel();

  return (
    <View>
      <FormText
        control={control}
        name="mda"
        label="MDA"
        onChangeText={onChangeMda}
      />
      <AppAutocomplete<AddModelData, string>
        control={control}
        name="partNumbers"
        label="Pieza"
        data={partNumbers ?? []}
        isLoading={isLoading}
        onSearch={function (query: string): void {
          console.log("holi");
        }}
        getLabel={function (item: string): string {
          return item;
        }}
        renderOption={function (item: string): React.ReactNode {
          return <AppText>{item}</AppText>;
        }}
      />
    </View>
  );
}
