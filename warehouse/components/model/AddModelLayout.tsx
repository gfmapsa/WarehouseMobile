import AppAutocomplete from "@/shared/components/input/AppAutocomplete";
import AppButton from "@/shared/components/input/AppButton";
import FormText from "@/shared/components/input/FormText";
import AppText from "@/shared/components/text/AppText";
import useAddModel, { AddModelData } from "@/warehouse/hooks/useAddModel";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function AddModelLayout() {
  const {
    control,
    handleSubmit,
    onSubmit,
    isPending,
    message,
    partNumbers,
    isErrorMutating,
    isLoading,
    onChangeMda,
    setSearchQuery,
  } = useAddModel();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
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
          multiple
          onSearch={setSearchQuery}
          getLabel={function (item: string): string {
            return item;
          }}
          renderOption={function (item: string): React.ReactNode {
            return <AppText>{item}</AppText>;
          }}
        />
      </View>
      <AppButton onPress={handleSubmit(onSubmit)}>Enviar</AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp("5%"),
    paddingHorizontal: wp("5%"),
    gap: hp("5%"),
  },

  form: {
    gap: hp("3%"),
  },
});
